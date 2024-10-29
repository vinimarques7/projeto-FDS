from django.db import models
from datetime import time
from django.contrib.auth.models import User


class Professor(models.Model):
    MATERIAS_CHOICES = [
        ('portugues', 'Português'),
        ('ingles', 'Inglês'),
        ('matematica', 'Matemática'),
        # Adicione mais matérias conforme necessário
    ]
    
    NIVEIS_CHOICES = [
        ('ensino_fundamental', 'Ensino Fundamental'),
        ('ensino_medio', 'Ensino Médio'),
        ('ensino_superior', 'Ensino Superior'),
    ]
    
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
    imagem = models.ImageField(upload_to='perfil_professor/', blank=True, null=True)
    
    
    

    def __str__(self):
        return f"{self.nome} - {self.materia} ({self.nivel_ensino})"

# class Horario(models.Model):
#     professor = models.ForeignKey(Professor, on_delete=models.CASCADE, related_name='horarios')
#     dia_semana = models.CharField(max_length=100)

#     hora_inicio = models.TimeField(default=time(9, 0))  Defina um valor padrão para hora de início
#     hora_fim = models.TimeField(default=time(17, 0))  

class Lembrete(models.Model):
    texto = models.CharField(max_length=255)
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.texto


class Avaliacao(models.Model):
    estrelas = models.IntegerField()
    comentario = models.TextField(max_length=500)
    id_aluno = models.IntegerField()
    nome_aluno = models.CharField(max_length=100)

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

class Agendamento(models.Model):
    professor = models.ForeignKey("Professor", on_delete=models.CASCADE)
    aluno = models.ForeignKey(User, on_delete=models.CASCADE)  # ou seu modelo de usuário
    data = models.DateField()
    meio_transmissao = models.CharField(max_length=50)
    meio_pagamento = models.CharField(max_length=50)
    comentarios = models.TextField(blank=True, null=True)
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.aluno} - {self.professor} - {self.data}"