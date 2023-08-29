from django.contrib import admin
from django.urls import path
from .views.login.login_views import CustomTokenObtainPairView,CustomTokenRefreshView,registration_view
from .views.budget.budget_views import BudgetListCreateView,BudgetRetrieveUpdateDeleteView,ExpenseListCreateView,ExpenseRetrieveUpdateDeleteView
from . import views
from .views.profile.profile_views import UserProfileView
urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', registration_view, name='register'),
    path('api/profile/', UserProfileView.as_view(), name='user-profile'),
    # path('api/budgets/', BudgetListCreateView.as_view(), name='budget-list-create'),
    # path('api/budgets/<int:pk>/', BudgetRetrieveUpdateDeleteView.as_view(), name='budget-detail'),
    # path('api/expenses/', ExpenseListCreateView.as_view(), name='expense-list-create'),
    # path('api/expenses/<int:pk>/', ExpenseRetrieveUpdateDeleteView.as_view(), name='expense-detail'),
]
