from django.db import models

class Professor(models.Model):
    id = models.BigAutoField(primary_key=True)
    nome = models.CharField(max_length=100)
    celular = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=100)
    materia = models.TextField()
    recebimento = models.TextField()
    comunicacao = models.TextField()
    genero = models.CharField(max_length=10)

class Horario(models.Model):
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE, related_name='horarios')
    dia = models.CharField(max_length=10)
    horario = models.TimeField()


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
    nome = models.CharField(max_length=255)
    materia = models.CharField(max_length=255)  # Campo para a matéria da turma
    assunto = models.CharField(max_length=255)  # Assunto abordado na turma
    alunos = models.ManyToManyField(Aluno, related_name='turmas')  # Relacionamento com Aluno

    def __str__(self):
        return self.nome
