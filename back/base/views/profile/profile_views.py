from rest_framework.permissions import IsAuthenticated
from ...serializers import CustomUserSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from ...models import CustomUser


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_authenticated_user(request):
    user = request.user
    serializer = CustomUserSerializer(user)
    return Response(serializer.data)