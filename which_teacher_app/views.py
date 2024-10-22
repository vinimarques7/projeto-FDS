from django.shortcuts import render, redirect
from .models import Professor, Horario
from django.contrib import messages

def cadastro_professor(request):
    if request.method == 'POST':
        nome = request.POST.get('nome')
        celular = request.POST.get('celular')
        email = request.POST.get('email')
        senha = request.POST.get('senha')
        materia = request.POST.getlist('materia')
        nivel_ensino = request.POST.getlist('nivel_ensino')
        recebimento = request.POST.getlist('recebimento')
        comunicacao = request.POST.getlist('comunicacao')
        genero = request.POST.get('genero')

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
        return redirect('loginP')
    return render(request, 'cadastroProfessor.html')

def loginP(request):
    if request.method == 'POST':
        email = request.POST.get('loginEmail')
        senha = request.POST.get('loginSenha')
        
        try:
            professor = Professor.objects.get(email=email)
            if professor.senha == senha:
                request.session['professor_id'] = professor.id
                return redirect('perfilP')
            messages.error(request, 'Senha incorreta')
        except Professor.DoesNotExist:
            messages.error(request, 'Email não encontrado')
    return render(request, 'loginProfessor.html')

def perfilP(request):
    professor_id = request.session.get('professor_id')
    professor = Professor.objects.get(id=professor_id)
    horarios = professor.horarios.all()

    if request.method == 'POST':
        dia = request.POST.get('dia')
        horario = request.POST.get('novo-horario')
        
        try:
            Horario.objects.create(
                professor=professor,
                dia=dia,
                horario=horario
            )
            messages.success(request, 'Horário adicionado com sucesso!')
        except Exception as e:
            messages.error(request, 'Erro ao adicionar horário: ' + str(e))
        
    return render(request, 'perfilProfessor.html', {'professor': professor, 'horarios': horarios})

def home(request):
    return render(request, 'landingPage.html')

def avaliacao(request):
    return render(request, 'avaliacao.html')

def cadastroP(request):
    return render(request, 'cadastroProfessor.html')

def busca(request):
    return render(request, 'busca.html')