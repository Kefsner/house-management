from django.contrib.auth.models import User
from django.db import transaction

from transactions.models import Category, Subcategory, Transaction, Account, Transfer, CreditCardTransaction, CreditCardInstallment

from creditcard_management.services import CreditCardServices
from creditcard_management.models import CreditCard

from dateutil.relativedelta import relativedelta

from core.exceptions import InsufficientFunds

class TransactionServices:
    def __init__(self, data: dict, credit_card_id: int = None) -> None:
        self.data = data
        self.credit_card_id = credit_card_id

    def create_transaction(self) -> dict:
        created_by = self.data['user']
        created_by = User.objects.get(id=created_by)
        description = self.data['description']
        category = self.data['category']
        category = Category.objects.get(id=category)
        subcategory = self.data.get('subcategory', None)
        if subcategory:
            subcategory = Subcategory.objects.get(id=subcategory)
        value = self.data['value']
        date = self.data['date']
        account = self.data['account']
        account = Account.objects.get(id=account)
        with transaction.atomic():
            Transaction.objects.create(
                description=description,
                value=value,
                category=category,
                subcategory=subcategory,
                date=date,
                account=account,
                created_by=created_by
            )
            if category.type == 'income':
                account.balance += value
            elif category.type == 'expense':
                account.balance -= value
            account.save()

    def create_credit_card_transaction(self) -> dict:
            created_by = self.data['user']
            created_by = User.objects.get(id=created_by)
            description = self.data['description']
            category = self.data['category']
            category = Category.objects.get(id=category)
            subcategory = self.data.get('subcategory', None)
            if subcategory:
                subcategory = Subcategory.objects.get(id=subcategory)
            value = self.data['value']
            date = self.data['date']
            credit_card = CreditCard.objects.get(id=self.credit_card_id)
            installments = self.data['installments']
            with transaction.atomic():
                credit_card_transaction = CreditCardTransaction.objects.create(
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
                    due_date = CreditCardServices.get_due_date(credit_card.due_date, date)
                    CreditCardInstallment.objects.create(
                        credit_card_transaction=credit_card_transaction,
                        value=value,
                        due_date=due_date,
                        installment_number=i + 1,
                        created_by=created_by
                    )
                    date = date + relativedelta(months=1)

    def create_transfer(self) -> dict:
        created_by = self.data['user']
        created_by = User.objects.get(id=created_by)
        value = self.data['value']
        date = self.data['date']
        from_account = self.data['from_account']
        from_account = Account.objects.get(id=from_account)
        to_account = self.data['account']
        to_account = Account.objects.get(id=to_account)
        if from_account.balance < value:
            raise InsufficientFunds
        with transaction.atomic():
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
