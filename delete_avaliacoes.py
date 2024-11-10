import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'which_teacher.settings')  
django.setup()

from which_teacher_app.models import Avaliacao



Avaliacao.objects.all().delete()
print("Todos as avaliacoes foram deletadas.")