import os
from .common import Common


class Production(Common):
    INSTALLED_APPS = Common.INSTALLED_APPS
    SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')
    # Site
    # https://docs.djangoproject.com/en/2.0/ref/settings/#allowed-hosts
    ALLOWED_HOSTS = ["*"]
    INSTALLED_APPS += ("gunicorn", )

    # Add hosts that are allowed to do cross-site requests to CORS_ORIGIN_WHITELIST
    # or set CORS_ORIGIN_ALLOW_ALL to True to allow all hosts.
    # CORS_ORIGIN_ALLOW_ALL = False
    # CORS_ORIGIN_WHITELIST = ('cartolab.lri.fr',)
    CORS_ORIGIN_ALLOW_ALL = True