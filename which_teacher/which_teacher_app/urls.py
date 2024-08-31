from django.urls import path
from . import views

urlpatterns = [
    # Esta rota chama a função 'index' em views.py
    path('', views.index, name='index'),  
]
