from rest_framework import serializers
from .models import Expense, Budget
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ['id', 'budget', 'amount', 'category', 'date']

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        # Customize response data if needed
        return data

class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        # Customize response data if needed
        return data
    
class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ['id', 'name', 'amount']
