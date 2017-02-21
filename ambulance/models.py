from django.db import models
from django.utils import timezone
import datetime


class Reg(models.Model):
    reg_date = models.DateField('date registered',auto_now_add=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    age = models.PositiveIntegerField(default=0)
    call_reason = models.CharField(max_length=500)

    def __str__(self):
        return self.first_name

    def was_published_recently(self):
        return self.reg_date >= timezone.now() - datetime.timedelta(days=1)


class New(models.Model):
    question = models.ForeignKey(Reg, on_delete=models.CASCADE)


class Emp(models.Model):

    name = models.CharField(max_length=50)
    position = models.CharField(max_length=50)

    def __str__(self):
        return self.last_name


class Calls(models.Model):
    call = models.ForeignKey(Reg,on_delete=models.CASCADE)
    car_id = models.IntegerField(default=0)
    doctor = models.ForeignKey(Emp, on_delete=models.CASCADE)
    call_time = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField('done', 'fail')

class Worktime(models.Model):

    doctor=models.ForeignKey(Emp)
    worktime = models.DurationField
