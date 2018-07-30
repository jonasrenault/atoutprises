import uuid

from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin


class UserManager(BaseUserManager):
    """
    A custom user manager to deal with emails as unique identifiers for auth
    instead of usernames. The default that's used is "UserManager"
    """
    def create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given email, and password.
        """
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(
            email=self.normalize_email(email),
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
            **extra_fields
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    is_admin = models.BooleanField(default=False, help_text=(
        'Designates whether this user is admin.'),
    )
    is_active = models.BooleanField(default=True, help_text=(
        'Designates whether this user should be treated as active. Unselect this instead of deleting accounts.'),
    )
    USERNAME_FIELD = 'email'
    objects = UserManager()
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin



