from django.db import models

class Professor(models.Model):
    nome = models.CharField(max_length=100)
    celular = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=100)
    materia = models.TextField()
    nivel_ensino = models.TextField()
    recebimento = models.TextField()
    comunicacao = models.TextField()
    genero = models.CharField(max_length=10)
    horario = models.TimeField()
    dia = models.CharField(max_length=10)

