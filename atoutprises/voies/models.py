from django.db import models


class Mur(models.Model):
    label = models.CharField(max_length=100, unique=False, null=False, blank=False)
    key = models.CharField(max_length=100, unique=True, null=False, blank=False)
    max_zoom = models.IntegerField(null=True)
    tiles_per_zoom = models.TextField(null=True, blank=True, default=None)