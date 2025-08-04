from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views



urlpatterns = [
    path('tasks/', views.hello_world),
    path('tasks/<int:id>/', views.hello_world),
    path('registration/', views.signup),
    
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    ]