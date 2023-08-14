from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser,Expense,Budget

    
admin.site.register(CustomUser)
admin.site.register(Expense)
admin.site.register(Budget)
