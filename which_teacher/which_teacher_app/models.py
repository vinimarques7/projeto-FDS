from django.db import models

class Professor(models.Model):
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=255)
    confirma_senha = models.CharField(max_length=255)

    def __str__(self):
        return self.email