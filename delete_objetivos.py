import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'which_teacher.settings')  
django.setup()

from which_teacher_app.models import ObjetivoEstudo
from which_teacher_app.models import TarefaObjetivo



TarefaObjetivo.objects.all().delete()
ObjetivoEstudo.objects.all().delete()
print("Todos os ObjetivoEstudo foram deletados.")