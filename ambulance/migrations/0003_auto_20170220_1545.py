# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-02-20 13:45
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ambulance', '0002_registraion_age'),
    ]

    operations = [
        migrations.CreateModel(
            name='Registration',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reg_date', models.DateField(verbose_name='date registered')),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=200)),
                ('address', models.CharField(max_length=200)),
                ('age', models.PositiveIntegerField(default=0)),
                ('call_reason', models.CharField(max_length=500)),
            ],
        ),
        migrations.DeleteModel(
            name='Registraion',
        ),
    ]
