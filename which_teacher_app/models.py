from django.db import models
from datetime import time
from django.contrib.auth.models import User

class Professor(models.Model):
    MATERIAS_CHOICES = [
        ('portugues', 'Português'),
        ('ingles', 'Inglês'),
        ('matematica', 'Matemática'),
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
    nivel_ensino = models.CharField(max_length=100, choices=NIVEIS_CHOICES)
    genero = models.CharField(max_length=10)
    imagem = models.ImageField(upload_to='perfil_professor/', blank=True, null=True)

    def __str__(self):
        return f"{self.nome} - {self.materia} ({self.nivel_ensino})"


class Lembrete(models.Model):
    texto = models.CharField(max_length=255)
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.texto

class Avaliacao(models.Model):
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE)
    estrelas = models.IntegerField()
    comentario = models.TextField(max_length=500)
    id_aluno = models.IntegerField()
    nome_aluno = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.nome_aluno} - {self.professor} - {self.estrelas} estrelas"

class Aluno(models.Model):
    id = models.BigAutoField(primary_key=True)
    nome = models.CharField(max_length=100)
    celular = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=100)
    nivel_ensino = models.CharField(max_length=100)
    genero = models.CharField(max_length=10)
    idade = models.CharField(max_length=3)
    objetivo_estudo = models.CharField(max_length=255, blank=True, null=True)  # Novo campo
    imagem = models.ImageField(upload_to='perfil_aluno/', blank=True, null=True)


    def __str__(self):
        return self.nome
    
class ObjetivoEstudo(models.Model):
    aluno = models.ForeignKey(Aluno, related_name='objetivos', on_delete=models.CASCADE)
    descricao = models.CharField(max_length=255)
    progresso = models.IntegerField(default=0)  # Progresso calculado com base nas tarefas

    def calcular_progresso(self):
        total_tarefas = self.tarefas.count()
        tarefas_concluidas = self.tarefas.filter(concluida=True).count()
        if total_tarefas > 0:
            self.progresso = int((tarefas_concluidas / total_tarefas) * 100)
        else:
            self.progresso = 0
        self.save()

class TarefaObjetivo(models.Model):
    objetivo = models.ForeignKey(ObjetivoEstudo, related_name='tarefas', on_delete=models.CASCADE)
    descricao = models.CharField(max_length=255)
    concluida = models.BooleanField(default=False)

    def __str__(self):
        return self.descricao

class Turma(models.Model):
    nome = models.CharField(max_length=100)
    materia = models.CharField(max_length=100)
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE)  # Relaciona a turma ao professor
    alunos = models.ManyToManyField(Aluno)

    def __str__(self):
        return self.nome

class Agendamento(models.Model):
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE)
    aluno = models.ForeignKey(Aluno, on_delete=models.CASCADE)  # ou seu modelo de usuário personalizado
    data = models.DateField()
    meio_transmissao = models.CharField(max_length=50)
    meio_pagamento = models.CharField(max_length=50)
    comentarios = models.TextField(blank=True, null=True)
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.aluno} - {self.professor} - {self.data}"