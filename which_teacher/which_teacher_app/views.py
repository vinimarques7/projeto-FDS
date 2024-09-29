from django.shortcuts import render, redirect
from .models import Professor

def register_professor(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        senha = request.POST.get('senha')
        confirma_senha = request.POST.get('confirmaSenha')

        if senha == confirma_senha:
            professor = Professor(email=email, senha=senha)
            professor.save()
            return redirect('cadastroP')  # redireciona para a página de cadastro
        else:
            return render(request, 'which_teacher_app/loginProfessor.html', {'error': 'Senhas não conferem'})

    return render(request, 'which_teacher_app/loginProfessor.html')

def home(request):
    return render(request, 'which_teacher_app/landingPage.html')

def cadastroP(request):
    return render(request, 'which_teacher_app/cadastroProfessor.html')

def perfilP(request):
    return render(request, 'which_teacher_app/perfilProfessor.html')


