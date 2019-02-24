# Generated by Django 2.1.7 on 2019-02-24 09:17

from django.db import migrations, models
import marblelympics.models


class Migration(migrations.Migration):

    dependencies = [
        ('marblelympics', '0005_auto_20190220_1153'),
    ]

    operations = [
        migrations.AddField(
            model_name='playerentry',
            name='selections',
            field=models.CharField(default='{}', max_length=2000, validators=[marblelympics.models.validate_entry_selections_string]),
        ),
    ]