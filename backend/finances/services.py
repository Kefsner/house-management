from django.contrib.auth.models import User

from finances.messages import FinancesMessages
from finances.models import Category, Subcategory, Transaction, Account, CreditCard, CreditCardTransaction, CreditCardInstallment

from core.exceptions import CategoryAlreadyExists, SubcategoryAlreadyExists, AccountAlreadyExists

from dateutil.relativedelta import relativedelta
import datetime
import holidays

class CategoryServices():
    def __init__(self, data: dict) -> None:
        self.data = data
        self.messages = FinancesMessages()

    def create_category(self) -> dict:
        user = self.data['user']
        name = self.data['name']
        type = self.data['type']
        if Category.objects.filter(type=type, name=name).exists():
            raise CategoryAlreadyExists(self.messages.category_already_exists)
        created_by = User.objects.get(id=user)
        Category.objects.create(name=name, type=type, created_by=created_by)
        payload = { 'success': self.messages.category_created }
        return payload
    

class SubcategoryServices():
    def __init__(self, data: dict) -> None:
        self.data = data
        self.messages = FinancesMessages()

    def create_subcategory(self) -> dict:
        user = self.data['user']
        name = self.data['name']
        category = self.data['category']
        category = Category.objects.get(id=category)
        if Subcategory.objects.filter(name=name, category=category).exists():
            raise SubcategoryAlreadyExists(self.messages.subcategory_already_exists)
        created_by = User.objects.get(id=user)
        Subcategory.objects.create(name=name, category=category, created_by=created_by)
        payload = { 'success': self.messages.subcategory_created }
        return payload
    
class AccountServices():
    def __init__(self, data: dict) -> None:
        self.data = data
        self.messages = FinancesMessages()

    def create_account(self) -> dict:
        user = self.data['user']
        user = User.objects.get(id=user)
        name = self.data['name'].lower()
        initial_balance = self.data['initial_balance']
        balance = initial_balance
        if Account.objects.filter(name=name, user=user).exists():
            raise AccountAlreadyExists(self.messages.account_already_exists)
        created_by = self.data['created_by']
        created_by = User.objects.get(id=created_by)
        Account.objects.create(name=name, initial_balance=initial_balance, balance=balance, user=user, created_by=created_by)
        payload = { 'success': self.messages.account_created }
        return payload

class TransactionServices():
    def __init__(self, data: dict) -> None:
        self.data = data
        self.messages = FinancesMessages()

    def create_transaction(self) -> dict:
        user = self.data['user']
        created_by = User.objects.get(id=user)
        category = self.data['category']
        category = Category.objects.get(id=category)
        subcategory = self.data['subcategory']
        if subcategory:
            subcategory = Subcategory.objects.get(id=subcategory)
        description = self.data['description']
        value = self.data['value']
        date = self.data['date']
        account = self.data['account']
        account = Account.objects.get(id=account)
        Transaction.objects.create(
            description=description,
            value=value,
            category=category,
            subcategory=subcategory,
            date=date,
            account=account,
            created_by=created_by
        )
        if category.type == 'I':
            account.balance += value
        else:
            account.balance -= value
        account.save()
        payload = { 'success': self.messages.transaction_created }
        return payload
    
class CreditCardServices():
    def __init__(self, data: dict) -> None:
        self.data = data
        self.messages = FinancesMessages()

    def create_credit_card(self) -> dict:
        created_by = self.data['created_by']
        created_by = User.objects.get(id=created_by)
        name = self.data['name']
        account = self.data['account']
        account = Account.objects.get(id=account)
        due_date = self.data['due_date']
        limit = self.data['limit']
        remaining_limit = limit
        CreditCard.objects.create(
            name=name,
            account=account,
            due_date=due_date,
            limit=limit,
            remaining_limit=remaining_limit,
            created_by=created_by
        )
        payload = { 'success': self.messages.credit_card_created }
        return payload

class CreditCardTransactionServices():
    def __init__(self, data: dict) -> None:
        self.data = data
        self.messages = FinancesMessages()

    def adjusts_for_holidays_and_weekends(self, date: datetime.date) -> datetime.date:
        while date in holidays.Brazil() or date.weekday() in [5, 6]:
            date += datetime.timedelta(days=1)
        return date
    
    def calculate_due_date(self, due_date: int, month: datetime.date) -> datetime.date:
        due_date = month.replace(day=due_date) + relativedelta(months=1)
        due_date = self.adjusts_for_holidays_and_weekends(due_date)
        closing_date = due_date - datetime.timedelta(days=7)
        today = datetime.date.today()
        if today > closing_date:
            due_date = due_date + relativedelta(months=1)
            due_date = self.adjusts_for_holidays_and_weekends(due_date)
        return due_date

    def create_credit_card_transaction(self) -> dict:
            user = self.data['user']
            created_by = User.objects.get(id=user)
            category = self.data['category']
            category = Category.objects.get(id=category)
            subcategory = self.data['subcategory']
            if subcategory:
                subcategory = Subcategory.objects.get(id=subcategory)
            description = self.data['description']
            value = self.data['value']
            date = self.data['date']
            credit_card = self.data['credit_card']
            credit_card = CreditCard.objects.get(id=credit_card)
            installments = self.data['installments']
            transaction = CreditCardTransaction.objects.create(
                description=description,
                value=value,
                category=category,
                subcategory=subcategory,
                date=date,
                credit_card=credit_card,
                installments=installments,
                created_by=created_by
            )
            credit_card.remaining_limit -= value
            credit_card.save()
            value = value / installments
            for i in range(installments):
                due_date = self.calculate_due_date(credit_card.due_date, date)
                CreditCardInstallment.objects.create(
                    credit_card_transaction=transaction,
                    value=value,
                    due_date=due_date,
                    installment_number=i + 1,
                    created_by=created_by
                )
                date = date + relativedelta(months=1)
            payload = { 'success': self.messages.credit_card_transaction_created }
            return payload
