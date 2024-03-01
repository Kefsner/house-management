from django.db import models
from django.contrib.auth.models import User

class MetaData(models.Model):
    """
    Abstract model for metadata fields.

    This model provides fields for the creation date and user who created the instance. It is intended to be
    used as an abstract base class for other models that require these fields.

    Attributes:
        id (int): The unique identifier for the instance.
        created_by (User): The user who created the instance.
        created_at (datetime): The date and time the instance was created.
    """
    id = models.AutoField(primary_key=True)
    created_by = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True