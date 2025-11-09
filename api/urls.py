from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import HelloView, RegisterView, LoginView, UserProfileView

urlpatterns = [
    path("hello/", HelloView.as_view(), name="hello"),
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/login/", LoginView.as_view(), name="login"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("auth/user/", UserProfileView.as_view(), name="user_profile"),
]
