# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-02-21 10:29
from __future__ import unicode_literals

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ambulance', '0005_auto_20170220_1648'),
    ]

    operations = [
        migrations.CreateModel(
            name='Calls',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('car_id', models.IntegerField(default=0)),
                ('call_time', models.DateTimeField(auto_now_add=True)),
                ('fail', models.BooleanField(verbose_name='done')),
            ],
        ),
        migrations.CreateModel(
            name='Emp',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('position', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Worktime',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ambulance.Emp')),
            ],
        ),
        migrations.AlterField(
            model_name='reg',
            name='reg_date',
            field=models.DateField(auto_now_add=True, verbose_name='date registered'),
        ),
        migrations.AddField(
            model_name='calls',
            name='call',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ambulance.Reg'),
        ),
        migrations.AddField(
            model_name='calls',
            name='doctor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ambulance.Emp'),
        ),
    ]
