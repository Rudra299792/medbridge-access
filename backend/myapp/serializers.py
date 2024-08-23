from rest_framework import serializers
from .models import Country, Hospital, Service, ServiceDetail, Patient, Doctor, MedicalReport, Appointment, Payment
from django.contrib.auth.models import User
from django.conf import settings


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password']
        extra_kwargs = {
            'password': {'write_only': True}  # Ensure password is not returned in the response
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)  # Remove the password from validated data
        user = User(**validated_data)  # Create a user instance without saving it yet

        if password is not None:
            user.set_password(password)  # Use set_password to hash the password

        user.save()  # Save the user instance to the database
        return user


class MedicalReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalReport
        fields = ['file', 'uploaded_at']

class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # Nested serialization for User
    medical_reports = MedicalReportSerializer(many=True, read_only=True)

    class Meta:
        model = Patient
        fields = ['id', 'user', 'country', 'phone', 'dob', 'medical_history', 'gender', 'medical_reports', 'user_type']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        patient = Patient.objects.create(user=user, **validated_data)

        medical_reports_data = self.context.get('medical_reports', [])
        for report_data in medical_reports_data:
            report = MedicalReport.objects.create(**report_data)
            patient.medical_reports.add(report)

        return patient


class DoctorSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Doctor
        fields = ['user', 'country', 'phone', 'degree', 'specialization', 'years_of_experience', 'branch', 'profile_photo', 'user_type']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        doctor = Doctor.objects.create(user=user, user_type='doctor', **validated_data)
        return doctor
class PatientSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'user', 'dob', 'gender']

class AppointmentSerializer(serializers.ModelSerializer):
    doctor = serializers.SerializerMethodField()
    patient = PatientSimpleSerializer()  # Serialize the patient information

    class Meta:
        model = Appointment
        fields = ['id', 'doctor', 'patient', 'problem_description', 'appointment_time']

    def get_doctor(self, obj):
        doctor = obj.doctor
        request = self.context.get('request')
        profile_photo_url = None
        if doctor.profile_photo:
            profile_photo_url = request.build_absolute_uri(settings.MEDIA_URL + str(doctor.profile_photo))
        return {
            'user': {
                'id': doctor.user.id,
                'username': doctor.user.username,
                'first_name': doctor.user.first_name,
                'last_name': doctor.user.last_name
            },
            'country': doctor.country,
            'degree': doctor.degree,
            'specialization': doctor.specialization,
            'years_of_experience': doctor.years_of_experience,
            'branch': doctor.branch,
            'profile_photo': profile_photo_url,
            'user_type': doctor.user_type
        }

class CreateAppointmentSerializer(serializers.ModelSerializer):
    patient = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())
    doctor = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all(), required=False, allow_null=True)
    payment = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = ['id', 'patient', 'doctor', 'problem_description', 'booking_time', 'appointment_time', 'status', 'payment']

    def get_payment(self, obj):
        try:
            payment = Payment.objects.get(appointment=obj)
            return {
                'razorpay_payment_id': payment.razorpay_payment_id,
                'amount': payment.amount,
                'status': payment.status,
                'timestamp': payment.timestamp
            }
        except Payment.DoesNotExist:
            return None

    def create(self, validated_data):
        payment_data = self.context.get('payment_data')
        appointment = Appointment.objects.create(**validated_data)
        
        if payment_data:
            Payment.objects.create(appointment=appointment, **payment_data)
        
        return appointment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['razorpay_payment_id', 'amount', 'status', 'timestamp']

class ServiceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceDetail
        fields = ['id', 'content']

class ServiceSerializer(serializers.ModelSerializer):
    details = ServiceDetailSerializer(many=True)

    class Meta:
        model = Service
        fields = ['id', 'heading', 'one_line_description', 'front_image', 'details']

    def create(self, validated_data):
        details_data = validated_data.pop('details')
        healthcare_service = Service.objects.create(**validated_data)
        for detail_data in details_data:
            ServiceDetail.objects.create(service=healthcare_service, content=detail_data['content'])
        return healthcare_service

    def update(self, instance, validated_data):
        details_data = validated_data.pop('details')
        instance.heading = validated_data.get('heading', instance.heading)
        instance.one_line_description = validated_data.get('one_line_description', instance.one_line_description)
        instance.front_image = validated_data.get('front_image', instance.front_image)
        instance.save()

        # Update the details
        for detail_data in details_data:
            detail_id = detail_data.get('id')
            if detail_id:
                detail_instance = ServiceDetail.objects.get(id=detail_id, service=instance)
                detail_instance.content = detail_data.get('content', detail_instance.content)
                detail_instance.save()
            else:
                ServiceDetail.objects.create(service=instance, content=detail_data['content'])

        return instance
        
class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = '__all__'