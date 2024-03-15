from django.contrib.auth.models import User

from account_management.models import Account
from creditcard_management.models import CreditCard

from dateutil.relativedelta import relativedelta
import datetime
import holidays

class CreditCardServices():
    def __init__(self, data: dict) -> None:
        self.data = data

    def create_credit_card(self) -> None:
        name = self.data['name']
        account = self.data['account']
        account = Account.objects.get(id=account)
        due_day = self.data['due_day']
        limit = self.data['limit']
        created_by = self.data['created_by']
        created_by = User.objects.get(id=created_by)
        CreditCard.objects.create(name=name, account=account, due_day=due_day, limit=limit, remaining_limit=limit, created_by=created_by)

    @staticmethod
    def adjusts_for_holidays_and_weekends(date: datetime.date) -> datetime.date:
        while date in holidays.Brazil() or date.weekday() in [5, 6]:
            date += datetime.timedelta(days=1)
        return date
    
    @staticmethod
    def get_due_date(due_date: int, month: datetime.date) -> datetime.date:
        due_date = month.replace(day=due_date) + relativedelta(months=1)
        due_date = CreditCardServices.adjusts_for_holidays_and_weekends(due_date)
        closing_date = due_date - datetime.timedelta(days=7)
        today = datetime.date.today()
        if today > closing_date:
            due_date = due_date + relativedelta(months=1)
            due_date = CreditCardServices.adjusts_for_holidays_and_weekends(due_date)
        return due_date