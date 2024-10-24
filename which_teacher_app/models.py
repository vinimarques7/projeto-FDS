from django.db import models
from datetime import time

class Professor(models.Model):
    id = models.BigAutoField(primary_key=True)
    nome = models.CharField(max_length=100)
    celular = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=100)
    materia = models.CharField(max_length=255, blank=True, null=True)
    recebimento = models.TextField()
    comunicacao = models.TextField()
    nivel_ensino = models.TextField()
    genero = models.CharField(max_length=10)
  
    
    
    

class Horario(models.Model):
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE, related_name='horarios')
    dia = models.CharField(max_length=10)
    hora_inicio = models.TimeField(default=time(9, 0))  # Defina um valor padrão para hora de início
    hora_fim = models.TimeField(default=time(17, 0))  

class Lembrete(models.Model):
    texto = models.CharField(max_length=255)
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.texto

class Aluno(models.Model):
    id = models.BigAutoField(primary_key=True)
    nome = models.CharField(max_length=100)
    celular = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=100)
    nivel_ensino = models.TextField()
    genero = models.CharField(max_length=10)
    idade = models.CharField(max_length=100)

class Turma(models.Model):
    nome = models.CharField(max_length=100)
    materia = models.CharField(max_length=100)
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE)  # Relaciona a turma ao professor
    alunos = models.ManyToManyField(Aluno)

    def __str__(self):
        return self.nome
