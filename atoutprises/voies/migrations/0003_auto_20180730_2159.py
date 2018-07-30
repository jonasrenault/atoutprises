# Generated by Django 2.0.7 on 2018-07-30 21:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('voies', '0002_auto_20180730_2113'),
    ]

    operations = [
        migrations.CreateModel(
            name='Top',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True)),
                ('climber', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tops', to=settings.AUTH_USER_MODEL)),
                ('route', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='toppers', to='voies.Route')),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='top',
            unique_together={('climber', 'route')},
        ),
    ]
