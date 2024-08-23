from django.contrib import admin
from .models import  Country, Hospital,Service,ServiceDetail, Patient,Doctor,Appointment
# Register your models here.

admin.site.register(Country)
admin.site.register(Hospital)
admin.site.register(Service)
admin.site.register(Patient)
admin.site.register(Doctor)
admin.site.register(ServiceDetail)
admin.site.register(Appointment)


