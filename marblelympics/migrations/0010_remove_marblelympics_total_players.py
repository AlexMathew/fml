# Generated by Django 2.1.7 on 2019-03-17 08:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('marblelympics', '0009_auto_20190312_0953'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='marblelympics',
            name='total_players',
        ),
    ]
