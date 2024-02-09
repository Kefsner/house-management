import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
django.setup()

from finances.models import Category, Subcategory
from django.contrib.auth.models import User

class InitDB:
    initialized = False
    def populate_categories(self):
        categories = [
            {
                'name': 'Housing',
                'type': 'E',
            },
            {
                'name': 'Supermarket/Groceries',
                'type': 'E'
            },
            {
                'name': 'Transportation',
                'type': 'E'
            },
            {
                'name': 'Bills & Utilities',
                'type': 'E'
            },
            {
                'name': 'Personal Care',
                'type': 'E'
            },
            {
                'name': 'Entertainment',
                'type': 'E'
            },
            {
                'name': 'Investments & Savings',
                'type': 'E'
            }
        ]
        for category in categories:
            c = Category.objects.create(**category, created_by=User.objects.get(username='admin'))
            print(f'Category {c.name} created successfully')


    def populate_subcategories(self):
        subcategories = [
            {
                'name': 'Rent',
                'category': Category.objects.get(name='Housing'),
                'description': 'Monthly rent payments'
            },
            {
                'name': 'Maintenance',
                'category': Category.objects.get(name='Housing'),
                'description': 'Repairs and improvements'
            },
            {
                'name': 'Utilities',
                'category': Category.objects.get(name='Housing'),
                'description': 'Electricity, water, gas, internet, etc'
            },
            {
                'name': 'Food',
                'category': Category.objects.get(name='Supermarket/Groceries'),
                'description': 'Everyday food and groceries'
            },
            {
                'name': 'Household',
                'category': Category.objects.get(name='Supermarket/Groceries'),
                'description': 'Cleaning supplies, toiletries, etc'
            },
            {
                'name': 'Beverages',
                'category': Category.objects.get(name='Supermarket/Groceries'),
                'description': 'Alcoholic and non-alcoholic drinks'
            },
            {
                'name': 'Car',
                'category': Category.objects.get(name='Transportation'),
                'description': 'Gas, maintenance, insurance, etc'
            },
            {
                'name': 'Public/Shared Transportation',
                'category': Category.objects.get(name='Transportation'),
                'description': 'Bus, train, uber, etc'
            },
            {
                'name': 'Electricity',
                'category': Category.objects.get(name='Bills & Utilities'),
                'description': 'Monthly electricity bill'
            },
            {
                'name': 'Water',
                'category': Category.objects.get(name='Bills & Utilities'),
                'description': 'Monthly water bill'
            },
            {
                'name': 'Internet',
                'category': Category.objects.get(name='Bills & Utilities'),
                'description': 'Monthly internet bill'
            },
            {
                'name': 'Phone',
                'category': Category.objects.get(name='Bills & Utilities'),
                'description': 'Monthly phone bill'
            },
            {
                'name': 'Health',
                'category': Category.objects.get(name='Personal Care'),
                'description': 'Medicine, doctor appointments, etc'
            },
            {
                'name': 'Beauty',
                'category': Category.objects.get(name='Personal Care'),
                'description': 'Haircuts, cosmetics, etc'
            },
            {
                'name': 'Clothing',
                'category': Category.objects.get(name='Personal Care'),
                'description': 'Clothes, shoes, etc'
            },
            {
                'name': 'Dining Out',
                'category': Category.objects.get(name='Entertainment'),
                'description': 'Restaurants, fast food, cafes, etc'
            },
            {
                'name': 'Movies',
                'category': Category.objects.get(name='Entertainment'),
                'description': 'Cinema, streaming services, etc'
            },
            {
                'name': 'Hobbies',
                'category': Category.objects.get(name='Entertainment'),
                'description': 'Books, games, music, etc'
            },
            {
                'name': 'Savings',
                'category': Category.objects.get(name='Investments & Savings'),
                'description': 'Money set aside in savings account',
            },
            {
                'name': 'Investments',
                'category': Category.objects.get(name='Investments & Savings'),
                'description': 'Stocks, bonds, etc'
            },
        ]    
        for subcategory in subcategories:
            Subcategory.objects.create(**subcategory, created_by=User.objects.get(username='admin'))

    def run(self):
        if self.initialized:
            return
        self.populate_categories()
        self.populate_subcategories()
        self.initialized = True
        print('Categories and subcategories populated successfully')

if __name__ == '__main__':
    init_db = InitDB()
    init_db.run()