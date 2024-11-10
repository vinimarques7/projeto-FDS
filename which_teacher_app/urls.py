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
    path('editarP/', views.editarP, name='editarP'),
    path('publicoP/<int:professor_id>/', views.publicoP, name='publicoP'),
    path('agendar_aula/<int:professor_id>/', views.agendar_aula, name='agendar_aula'),
    path('agendar_sucesso/<int:professor_id>/', views.agendar_sucesso, name='agendar_sucesso'),
    path('avaliacao/<int:professor_id>/', views.avaliacao, name='avaliacao'),
    path('perfil_aluno/', views.perfil_aluno, name='perfil_aluno'),
    path('editar_aluno/', views.editar_aluno, name='editar_aluno'),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
