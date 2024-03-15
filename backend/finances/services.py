from django.contrib.auth.models import User

from finances.messages import FinancesMessages
from finances.models import Category, Subcategory, Transaction, Account, Transfer

from core.exceptions import CategoryAlreadyExists, SubcategoryAlreadyExists, AccountAlreadyExists, InsufficientFunds

from dateutil.relativedelta import relativedelta
import datetime
import holidays

class CategoryServices:
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
    

class SubcategoryServices:
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
    
class TransactionServices:
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

class CreditCardTransactionServices:
    def __init__(self, data: dict) -> None:
        self.data = data
        self.messages = FinancesMessages()

    def create_credit_card_transaction(self) -> dict:
    #         user = self.data['user']
    #         created_by = User.objects.get(id=user)
    #         category = self.data['category']
    #         category = Category.objects.get(id=category)
    #         subcategory = self.data['subcategory']
    #         if subcategory:
    #             subcategory = Subcategory.objects.get(id=subcategory)
    #         description = self.data['description']
    #         value = self.data['value']
    #         date = self.data['date']
    #         credit_card = self.data['credit_card']
    #         credit_card = CreditCard.objects.get(id=credit_card)
    #         installments = self.data['installments']
    #         transaction = CreditCardTransaction.objects.create(
    #             description=description,
    #             value=value,
    #             category=category,
    #             subcategory=subcategory,
    #             date=date,
    #             credit_card=credit_card,
    #             installments=installments,
    #             created_by=created_by
    #         )
    #         credit_card.remaining_limit -= value
    #         credit_card.save()
    #         value = value / installments
    #         for i in range(installments):
    #             due_date = CreditCardServices.get_due_date(credit_card.due_date, date)
    #             CreditCardInstallment.objects.create(
    #                 credit_card_transaction=transaction,
    #                 value=value,
    #                 due_date=due_date,
    #                 installment_number=i + 1,
    #                 created_by=created_by
    #             )
    #             date = date + relativedelta(months=1)
            payload = { 'success': self.messages.credit_card_transaction_created }
            return payload

class TransferServices:
    def __init__(self, data: dict) -> None:
        self.data = data
        self.messages = FinancesMessages()

    def create_transfer(self) -> dict:
        user = self.data['user']
        created_by = User.objects.get(id=user)
        value = self.data['value']
        from_account = self.data['from_account']
        from_account = Account.objects.get(id=from_account)
        to_account = self.data['account']
        to_account = Account.objects.get(id=to_account)
        if from_account.balance < value:
            raise InsufficientFunds(self.messages.insufficient_funds)
        date = self.data['date']
        Transfer.objects.create(
            value=value,
            from_account=from_account,
            to_account=to_account,
            date=date,
            created_by=created_by
        )
        from_account.balance -= value
        to_account.balance += value
        from_account.save()
        to_account.save()
        payload = { 'success': self.messages.transfer_created }
        return payload
    
class RecurrentTransactionServices:
    def __init__(self, data: dict) -> None:
        self.data = data
        self.messages = FinancesMessages()

    def create_recurrent_transaction(self) -> dict:
        pass
    