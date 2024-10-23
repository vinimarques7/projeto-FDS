from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.home, name='home'),
    path('loginP/', views.loginP, name='loginP'),
    path('cadastroP/', views.cadastro_professor, name='cadastroP'),
    path('perfilP/', views.perfilP, name='perfilP'),
    path('cadastroA/', views.cadastro_aluno, name='cadastroP'),
    path('loginA/', views.loginA, name='loginA'),
    path('busca/', views.busca, name='busca'),
    path('agendar/', views.agendar_aula, name='agendar_aula'),
    path('avaliacao/', views.avaliacao, name='avaliacao'),
    path('editarP/', views.editarP, name='editarP')
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)