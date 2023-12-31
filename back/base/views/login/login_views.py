# budget_app/login_views.py

from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from ...serializers import CustomTokenObtainPairSerializer, CustomTokenRefreshSerializer,RegistrationSerializer
from django.http import JsonResponse
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
User = get_user_model()

@api_view(['POST'])
def login_view(request):
    if request.method == 'POST':
        email = request.data.get('email')  # Use request.data to access POST data
        password = request.data.get('password')  # Use request.data to access POST data
        user = authenticate(request, email=email, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            response_data = {'success': True, 'access_token': access_token}
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            response_data = {'success': False, 'message': 'Invalid credentials'}
            return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)

    response_data = {'success': False, 'message': 'Invalid request'}
    return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def registration_view(request):
    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            response.data['success'] = True
        return response

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            response.data['success'] = True
        return response

class CustomTokenRefreshView(TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer