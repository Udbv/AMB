# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-02-20 14:48
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ambulance', '0004_new'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Registration',
            new_name='Reg',
        ),
    ]
