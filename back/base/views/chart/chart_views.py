# views.py
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from ...models import ChartData
from ...serializers import ChartSerializer
from rest_framework.response import Response
from rest_framework import status
class ChartCreate(generics.CreateAPIView):
   queryset = ChartData.objects.all()
   serializer_class = ChartSerializer
   permission_classes = [IsAuthenticated]

# class ChartViewSet(viewsets.ModelViewSet):
#     queryset = Chart.objects.all()
#     serializer_class = ChartSerializer

class ChartList(generics.ListCreateAPIView):
    def post(self, request):
        print(request.data)
        return Response("test", status=status.HTTP_200_OK)
    # queryset = ChartData.objects.all()
    # serializer_class = ChartSerializer
    # permission_classes = [IsAuthenticated]

class ChartDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ChartData.objects.all()
    serializer_class = ChartSerializer
    permission_classes = [IsAuthenticated]
