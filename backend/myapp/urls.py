from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

urlpatterns = [
    path('countries/', views.country_list, name='country_list'),
    path('countries/<int:pk>/', views.country_detail, name='country_detail'),
    path('hospitals/', views.hospital_list, name='hospital_list'),
    path('hospitals/<int:pk>/', views.hospital_detail, name='hospital_detail'),
    path('services/', views.service_list_create, name='service-list-create'),
    path('services/<int:pk>/', views.service_detail, name='service-detail'),
    path('create_patient/', views.create_patient, name='create_patient'),
    path('patient_login/', views.login_user, name='login_patient'),
    path('doctor_login/', views.doctor_login, name='login_doctor'),
    path('get_patient_appointments/', views.get_patient_appointments, name='get_patient_appointments'),
    path('doctor/appointments/', views.get_doctor_appointments, name='get_doctor_appointments'),
    path('doctor/patient/<int:patient_id>/', views.get_patient_details, name='get_patient_details'),

    path('create_doctor/', views.create_doctor, name='create_doctor'),
  
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)