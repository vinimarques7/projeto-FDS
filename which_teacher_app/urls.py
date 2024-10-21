from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('loginP/', views.loginP, name='loginP'),
    path('cadastroP/', views.cadastro_professor, name='cadastroP'),
    path('perfilP/', views.perfilP, name='perfilP'),
    path('busca/', views.busca, name='busca'),
]