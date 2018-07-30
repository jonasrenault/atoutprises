from django.db import models


class Wall(models.Model):
    label = models.CharField(max_length=100, unique=False, null=False, blank=False)
    key = models.CharField(max_length=100, unique=True, null=False, blank=False)
    max_zoom = models.IntegerField(null=True)
    tiles_per_zoom = models.TextField(null=True, blank=True, default=None)

    def __str__(self):
        return '%s (%s)' % (self.label, self.key)


class Route(models.Model):
    wall = models.ForeignKey(Wall, related_name='routes', on_delete=models.CASCADE)
    setter = models.CharField(max_length=256)
    colour = models.CharField(max_length=100)
    grade = models.CharField(max_length=100)
    lane = models.CharField(max_length=100)
    holds = models.TextField(null=True, blank=True, default=None)

    def __str__(self):
        return 'lane %s: %s %s (%s)' % (self.lane, self.grade, self.colour, self.setter)