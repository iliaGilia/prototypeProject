from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from ...models import CustomUser
from ...serializers import CustomUserSerializer
from rest_framework.authentication import TokenAuthentication



class UserProfileView(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    authentication_classes = [TokenAuthentication]  # Use TokenAuthentication
    permission_classes = [IsAuthenticated]  

    def get(self, request):
        user = request.user
