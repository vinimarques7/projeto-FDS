from django.db import models

class professor(models.Model):
    id_prof = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=100)
    senha = models.CharField(max_length=100)
