from django.contrib import admin
from .models import Professor, Aluno, Horario, Turma, Lembrete, Review

admin.site.register(Professor)
admin.site.register(Aluno)
admin.site.register(Horario)
admin.site.register(Turma)
admin.site.register(Lembrete)
admin.site.register(Review)
