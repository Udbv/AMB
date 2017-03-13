from django.contrib import admin

from ambulance.models import Reg, Calls, Emp , Journal

# Register your models here.
admin.site.register(Reg)
admin.site.register(Calls)
admin.site.register(Emp)
admin.site.register(Journal)
