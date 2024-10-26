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
    imagem = models.ImageField(
        upload_to='perfil_professor/', blank=True, null=True)
    pass


class Horario(models.Model):
    professor = models.ForeignKey(
        Professor, on_delete=models.CASCADE, related_name='horarios')
    dia = models.CharField(max_length=10)

    # Defina um valor padrão para hora de início
    hora_inicio = models.TimeField(default=time(9, 0))
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


class Review(models.Model):
    aluno = models.ForeignKey(
        Aluno, on_delete=models.CASCADE, related_name='review')  # Aluno que avalia
    professor = models.ForeignKey(
        Professor, on_delete=models.CASCADE, related_name='reviews')  # Professor avaliado
    rating = models.PositiveSmallIntegerField(default=0)  # Nota entre 1 e 5
    comment = models.TextField(blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.professor} - {self.rating}'


class Turma(models.Model):
    nome = models.CharField(max_length=100)
    materia = models.CharField(max_length=100)
    # Relaciona a turma ao professor
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE)
    alunos = models.ManyToManyField(Aluno)

    def __str__(self):
        return self.nome
