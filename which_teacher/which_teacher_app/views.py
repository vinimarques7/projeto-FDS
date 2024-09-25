from django.shortcuts import render

def home(request):
    return render(request, 'which_teacher_app/landingPage.html')

def loginP(request):
    return render(request, 'which_teacher_app/loginProfessor.html')  # Renderiza o template loginProfessor.html

def cadastroP(request):
    return render(request, 'which_teacher_app/cadastroProfessor.html')

def perfilP(request):
    return render(request, 'which_teacher_app/perfilProfessor.html')