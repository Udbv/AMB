from django.db import models

class Registraion(models.Model):
    card_id = models.PositiveIntegerField
    reg_date = models.DateField('date registred')
    first_name = models.CharField(max_length=50)
    last_name = models.CharField (max_length=200)
    address = models.CharField (max_length=200)
    age = models.PositiveIntegerField
    call_reason = models.CharField (max_length=500)
   # lexa = models.TimeField('time')
