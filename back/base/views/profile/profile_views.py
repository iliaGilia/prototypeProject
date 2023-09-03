from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from ...models import CustomUser
from ...serializers import CustomUserSerializer
from rest_framework.authentication import TokenAuthentication
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required



@login_required
def profile(request):
    user = request.user
    profile_data = {
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        # Add more profile data as needed
    }
    return JsonResponse(profile_data)
