# Generated by Django 2.0.7 on 2018-07-30 21:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='max_grade',
            field=models.CharField(blank=True, max_length=10, verbose_name='max grade topped'),
        ),
        migrations.AddField(
            model_name='user',
            name='score',
            field=models.FloatField(default=0.0),
        ),
    ]