import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'which_teacher.settings')  
django.setup()

from which_teacher_app.models import Professor


Professor.objects.all().delete()
print("Todos os usuários foram deletados.")