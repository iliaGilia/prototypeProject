from django.contrib import admin
from django.urls import path
from .views.login.login_views import CustomTokenObtainPairView, CustomTokenRefreshView, registration_view
from .views.budget.budget_views import BudgetListCreateView, BudgetRetrieveUpdateDeleteView, ExpenseListCreateView, ExpenseRetrieveUpdateDeleteView
from .views.profile.profile_views import get_authenticated_user, upload_profile_image  # Import the upload_profile_image view
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', registration_view, name='register'),
    path('api/get_authenticated_user/', get_authenticated_user, name='profile'),
    path('api/upload_profile_image/', upload_profile_image, name='upload_profile_image'),  # Add the image upload URL
    # path('api/budgets/', BudgetListCreateView.as_view(), name='budget-list-create'),
    # path('api/budgets/<int:pk>/', BudgetRetrieveUpdateDeleteView.as_view(), name='budget-detail'),
    # path('api/expenses/', ExpenseListCreateView.as_view(), name='expense-list-create'),
    # path('api/expenses/<int:pk>/', ExpenseRetrieveUpdateDeleteView.as_view(), name='expense-detail'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)