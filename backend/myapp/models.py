from django.db import models
from django.contrib.auth.models import User

class MedicalReport(models.Model):
    file = models.FileField(upload_to='medical_reports/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

class Profile(models.Model):
    USER_TYPE_CHOICES = (
        ('patient', 'Patient'),
        ('doctor', 'Doctor'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)
    country = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)

    class Meta:
        abstract = True

class Patient(Profile):
    dob = models.DateField()
    medical_history = models.TextField()
    gender = models.CharField(max_length=10)
    medical_reports = models.ManyToManyField(MedicalReport)
    user_type = models.CharField(max_length=10, choices=Profile.USER_TYPE_CHOICES, default='patient')
    
class Doctor(Profile):
    degree = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    years_of_experience = models.IntegerField()
    branch = models.CharField(max_length=100)
    profile_photo = models.ImageField(upload_to='profile_photos/', blank=True, null=True)
    user_type = models.CharField(max_length=10, choices=Profile.USER_TYPE_CHOICES, default='doctor')
    
class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, null=True, blank=True)
    problem_description = models.TextField()
    booking_time = models.DateTimeField(auto_now_add=True)
    appointment_time = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, default='Pending')

class Payment(models.Model):
    appointment = models.OneToOneField(Appointment, on_delete=models.CASCADE)
    razorpay_payment_id = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, default='Pending')
    timestamp = models.DateTimeField(auto_now_add=True)


class Service(models.Model):
    heading = models.CharField(max_length=255)
    one_line_description = models.CharField(max_length=255)
    front_image = models.ImageField(upload_to='service_images/',null=True, blank=True)


    def __str__(self):
        return self.heading  
    
      
    
class ServiceDetail(models.Model):
    service = models.ForeignKey(Service, related_name='details', on_delete=models.CASCADE)
    content = models.TextField()

    def __str__(self):
        return self.content    

class Country(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='static/images/country_images/', null=True, blank=True)

    def __str__(self):
        return self.name



class Hospital(models.Model):
    name = models.CharField(max_length=255)
    country = models.ForeignKey(Country, related_name='hospitals', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='static/images/hospital_images/', null=True, blank=True)

    def __str__(self):
        return self.name
    

    