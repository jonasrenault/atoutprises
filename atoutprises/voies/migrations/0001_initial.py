# Generated by Django 2.0.7 on 2018-07-18 13:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Mur',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=100)),
                ('key', models.CharField(max_length=100, unique=True)),
                ('max_zoom', models.IntegerField(null=True)),
                ('tiles_per_zoom', models.TextField(blank=True, default=None, null=True)),
            ],
        ),
    ]
