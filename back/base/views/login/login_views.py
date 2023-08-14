# budget_app/login_views.py

from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from ...serializers import CustomTokenObtainPairSerializer, CustomTokenRefreshSerializer
from django.http import JsonResponse
from rest_framework.response import Response
from django.contrib.auth import get_user_model
User = get_user_model()

def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, email=email, password=password)
        
        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            response_data = {'success': True, 'access_token': access_token}
            return JsonResponse(response_data)
        else:
            response_data = {'success': False, 'message': 'Invalid credentials'}
            return JsonResponse(response_data)
    
    response_data = {'success': False, 'message': 'Invalid request'}
    return JsonResponse(response_data)

def registration_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        # You can add more validation and error handling here
        
        user = User.objects.create_user(email=email, password=password)
        return JsonResponse({'message': 'User registered successfully.'})
    return JsonResponse({'message': 'Registration form not submitted.'}, status=400)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class CustomTokenRefreshView(TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer