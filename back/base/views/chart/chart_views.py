# views.py
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from ...models import ChartData
from ...serializers import ChartDataSerializer
class ChartCreate(generics.CreateAPIView):
   queryset = ChartData.objects.all()
   serializer_class = ChartDataSerializer
   permission_classes = [IsAuthenticated]

class ChartList(generics.ListCreateAPIView):
    queryset = ChartData.objects.all()
    serializer_class = ChartDataSerializer
    permission_classes = [IsAuthenticated]

class ChartDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ChartData.objects.all()
    serializer_class = ChartDataSerializer
    permission_classes = [IsAuthenticated]
