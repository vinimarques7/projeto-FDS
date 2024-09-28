from django.shortcuts import render
from .models import professor

def home(request):
    return render(request, 'which_teacher_app/landingPage.html')

def loginP(request):
    return render(request, 'which_teacher_app/loginProfessor.html')  # Renderiza o template loginProfessor.html

def cadastroP(request):
    return render(request, 'which_teacher_app/cadastroProfessor.html')

def perfilP(request):
    return render(request, 'which_teacher_app/perfilProfessor.html')

def UsuProf(request):
    novo_professor = professor()
    novo_professor.email = request.POST.get('email')
    novo_professor.senha = request.POST.get('senha')
    novo_professor.save()
