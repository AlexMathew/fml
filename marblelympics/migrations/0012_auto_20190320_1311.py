# Generated by Django 2.1.7 on 2019-03-20 13:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marblelympics', '0011_auto_20190318_1720'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='cdn_image',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='team',
            name='image',
            field=models.CharField(blank=True, max_length=500),
        ),
    ]
