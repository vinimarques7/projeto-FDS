from django.shortcuts import render, redirect
from .models import Professor
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User

def cadastro_professor(request):
    if request.method == 'POST':
        nome = request.POST.get('nome')
        celular = request.POST.get('celular')
        email = request.POST.get('email')
        senha = request.POST.get('senha')
        confirmar_senha = request.POST.get('confirmar_senha')
        materia = request.POST.getlist('materia')
        nivel_ensino = request.POST.getlist('nivel_ensino')
        recebimento = request.POST.getlist('recebimento')
        comunicacao = request.POST.getlist('comunicacao')
        genero = request.POST.get('genero')

        if senha != confirmar_senha:
            return render(request, 'which_teacher_app/cadastroProfessor.html', {'error': 'Senhas não conferem'})
        else:
            professor = Professor(
                nome=nome,
                celular=celular,
                email=email,
                senha=senha,
                materia=', '.join(materia),
                nivel_ensino=', '.join(nivel_ensino),
                recebimento=', '.join(recebimento),
                comunicacao=', '.join(comunicacao),
                genero=genero
            )
            professor.save()
            return redirect('which_teacher_app/loginProfessor.html')
    else:
        return render(request, 'which_teacher_app/cadastroProfessor.html')
    
def loginP(request):
    return render(request, 'which_teacher_app/loginProfessor.html')

def home(request):
    return render(request, 'which_teacher_app/landingPage.html')

def cadastroP(request):
    return render(request, 'which_teacher_app/cadastroProfessor.html')

def perfilP(request):
    return render(request, 'which_teacher_app/perfilProfessor.html')


