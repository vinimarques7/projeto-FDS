from django.db import models


class Professor(models.Model):
    nome = models.CharField(max_length=255)
    celular = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=255)
    materia = models.CharField(max_length=255, blank=True)
    nivel_ensino = models.CharField(max_length=255, blank=True)
    recebimento = models.CharField(max_length=255, blank=True)
    comunicacao = models.CharField(max_length=255, blank=True)
    genero = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.nome