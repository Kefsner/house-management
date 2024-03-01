from core.messages import CoreMessages

class CategoryMessages(CoreMessages):
    _category_created = 'Category created successfully.'

    @property
    def category_created(self):
        return self._category_created
    
class SubcategoryMessages(CoreMessages):
    _subcategory_created = 'Subcategory created successfully.'

    @property
    def subcategory_created(self):
        return self._subcategory_created