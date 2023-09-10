from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from ...serializers import CustomUserSerializer
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from ...models import CustomUser


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_authenticated_user(request):
    user = request.user
    serializer = CustomUserSerializer(user)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser])  # Use MultiPartParser to handle file uploads
def upload_profile_image(request):
    user = request.user

    if 'profile_image' in request.FILES:
        user.profile_image = request.FILES['profile_image']
        user.save()
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)

    return Response({'error': 'No profile image provided'}, status=status.HTTP_400_BAD_REQUEST)