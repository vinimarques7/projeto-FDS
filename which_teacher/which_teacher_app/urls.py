from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('loginP/', views.loginP, name='loginP'),
    path('cadastroP/', views.cadastroP, name='cadastroP'),
    path('perfilP/', views.perfilP, name='perfilP'),
]