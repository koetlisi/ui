from django.db import models
from django.contrib.auth.models import AbstractUser


# OopCompanion:suppressRename


# Create your models here.

class User(AbstractUser):
    name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        blank=True,
        related_name='assaystation_user_permissions'
    )
    groups = models.ManyToManyField(
        'auth.Group',
        blank=True,
        related_name='assaystation_user_groups'
    )

    def __str__(self):
        return self.email

