from rest_framework.decorators import api_view, parser_classes,permission_classes
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import transaction
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework import status
from .models import Country, Hospital, Service, MedicalReport, Patient, Doctor, Appointment, Payment
from .serializers import CountrySerializer, HospitalSerializer, ServiceSerializer, PatientSerializer, DoctorSerializer, CreateAppointmentSerializer, AppointmentSerializer
import json
import jwt
from datetime import datetime, timedelta
from django.conf import settings
from django.utils.dateparse import parse_date


@api_view(['POST'])
@permission_classes([AllowAny])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def create_patient(request):
    if request.method == 'POST':
        try:
            user_data = json.loads(request.data.get('user', '{}'))
        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON for user data"}, status=400)

        if not user_data:
            return Response({"error": "User data is required"}, status=400)

        medical_reports = []
        for file in request.FILES.getlist('medical_reports'):
            medical_reports.append({'file': file})

        patient_data = {
            'user': user_data,
            'country': request.data.get('country'),
            'phone': request.data.get('phone'),
            'dob': request.data.get('dob'),
            'medical_history': request.data.get('medical_history'),
            'gender': request.data.get('gender'),
        }

        serializer = PatientSerializer(data=patient_data, context={'medical_reports': medical_reports})

        if serializer.is_valid():
            patient = serializer.save()
            # Serialize the saved patient instance and include tokens
            response_data = serializer.data
            tokens = generate_token(patient.user)
            response_data.update({
                'access_token': tokens['access'],
                'refresh_token': tokens['refresh'],
            })
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response({"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

def generate_token(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
    
@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    if request.method == 'POST':
        username = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user:
            try:
                patient = Patient.objects.get(user=user)
            except Patient.DoesNotExist:
                return Response({"error": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)

            tokens = generate_token(user)
            response_data = PatientSerializer(patient).data
            response_data.update({
                'access_token': tokens['access'],
                'refresh_token': tokens['refresh'],
            })
            print(response_data)
            return Response(response_data, status=status.HTTP_200_OK)
            
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    return Response({"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
@permission_classes([AllowAny])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def create_doctor(request):
    if request.method == 'POST':
        try:
            user_data = json.loads(request.data.get('user', '{}'))
        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON for user data"}, status=400)

        if not user_data:
            return Response({"error": "User data is required"}, status=400)

        doctor_data = {
            'user': user_data,
            'country': request.data.get('country'),
            'phone': request.data.get('phone'),
            'degree': request.data.get('degree'),
            'specialization': request.data.get('specialization'),
            'years_of_experience': request.data.get('years_of_experience'),
            'branch': request.data.get('branch'),
            'profile_photo': request.FILES.get('profile_photo'),
        }

        serializer = DoctorSerializer(data=doctor_data)

        if serializer.is_valid():
            doctor = serializer.save()
            tokens = generate_token(doctor.user)
            return Response({
                'access_token': tokens['access'],
                'refresh_token': tokens['refresh'],
                **serializer.data
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response({"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
@permission_classes([AllowAny])
def doctor_login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        try:
            doctor = Doctor.objects.get(user=user)
            doctor_serializer = DoctorSerializer(doctor)
            tokens = generate_token(user)
            return Response({
                'access_token': tokens['access'],
                'refresh_token': tokens['refresh'],
                **doctor_serializer.data
            }, status=status.HTTP_200_OK)
        except Doctor.DoesNotExist:
            return Response({'error': 'User is not a doctor'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_patient_details(request, patient_id):
    try:
        patient = Patient.objects.get(id=patient_id)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found"}, status=404)

    serializer = PatientSerializer(patient)
    print(serializer.data)
    return Response(serializer.data, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def book_appointment(request):
    patient = request.user.patient
    problem_description = request.data.get('problem_description')
    razorpay_payment_id = request.data.get('razorpay_payment_id')
    
    appointment_data = {
        'patient': patient.id,
        'problem_description': problem_description,
        'status': 'Pending'
    }
    
    payment_data = {
        'razorpay_payment_id': razorpay_payment_id,
        'amount': 500.00,  # Set the appropriate amount
        'status': 'Completed'
    }
    
    serializer = CreateAppointmentSerializer(data=appointment_data, context={'payment_data': payment_data})
    
    if serializer.is_valid():
        appointment = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_patient_appointments(request):
    try:
        patient = request.user.patient
    except Patient.DoesNotExist:
        return Response({"error": "User is not a patient"}, status=status.HTTP_400_BAD_REQUEST)

    appointments = Appointment.objects.filter(patient=patient).select_related('doctor', 'doctor__user')
    serializer = AppointmentSerializer(appointments, many=True, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_doctor_appointments(request):
    try:
        doctor = request.user.doctor  # Ensure the user is a doctor
    except Doctor.DoesNotExist:
        return Response({"error": "User is not a doctor"}, status=400)

    date_str = request.query_params.get('date')
    if date_str:
        date = parse_date(date_str)
        appointments = Appointment.objects.filter(doctor=doctor, appointment_time__date=date)
    else:
        appointments = Appointment.objects.filter(doctor=doctor)
    print(f"Doctor: {doctor}")
    print(f"Requested Date: {date}")
    print(f"Appointments found: {appointments.count()}")

    serializer = AppointmentSerializer(appointments, many=True, context={'request': request})
    return Response(serializer.data, status=200)

@api_view(['GET', 'POST'])
def country_list(request):
    if request.method == 'GET':
        countries = Country.objects.all()
        serializer = CountrySerializer(countries, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = CountrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def country_detail(request, pk):
    try:
        country = Country.objects.get(pk=pk)
    except Country.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CountrySerializer(country)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = CountrySerializer(country, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        country.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def hospital_list(request):
    if request.method == 'GET':
        hospitals = Hospital.objects.all()
        serializer = HospitalSerializer(hospitals, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = HospitalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def hospital_detail(request, pk):
    try:
        hospital = Hospital.objects.get(pk=pk)
    except Hospital.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = HospitalSerializer(hospital)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = HospitalSerializer(hospital, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        hospital.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




@api_view(['GET', 'POST'])
@permission_classes([AllowAny])  # This allows unauthenticated requests to this view

@parser_classes([MultiPartParser, FormParser, JSONParser])
def service_list_create(request):
    if request.method == 'GET':
        services = Service.objects.all()
        serializer = ServiceSerializer(services, many=True, context={'request': request})
        return Response(serializer.data)
    
    elif request.method == 'POST':
        try:
            # Check if 'front_image' exists in request.FILES for file uploads
            front_image = request.FILES.get('front_image')
            
            # If front_image is present, handle form-data case
            if front_image or request.content_type == 'multipart/form-data':
                # Get all data from request, including files
                data_dict = request.data
                if front_image:
                    data_dict['front_image'] = front_image

            # Otherwise, handle the JSON case
            else:
                data_dict = request.data

            serializer = ServiceSerializer(data=data_dict)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny])  # This allows unauthenticated requests to this view
@parser_classes([MultiPartParser, FormParser])
def service_detail(request, pk):
    try:
        service = Service.objects.get(pk=pk)
    except Service.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ServiceSerializer(service, context={'request': request})
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = ServiceSerializer(service, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        service.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)