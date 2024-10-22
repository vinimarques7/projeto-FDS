from django.shortcuts import render, redirect
from .models import Professor, Horario, Aluno, Turma
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
    alunos = Aluno.objects.all()

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
        
    return render(request, 'perfilProfessor.html', {'professor': professor, 'horarios': horarios, 'alunos': alunos})

def cadastro_aluno(request):
    if request.method == 'POST':
        nome = request.POST.get('nome')
        celular = request.POST.get('celular')
        email = request.POST.get('email')
        senha = request.POST.get('senha')
        nivel_ensino = request.POST.getlist('nivel_ensino')
        idade = request.POST.get('idade')
        genero = request.POST.get('genero')

        aluno = Aluno(
            nome=nome,
            celular=celular,
            email=email,
            senha=senha,
            nivel_ensino=', '.join(nivel_ensino),
            idade=idade,
            genero=genero
        )
        aluno.save()
        return redirect('loginA')
    return render(request, 'cadastroAluno.html')

def loginA(request):
    if request.method == 'POST':
        email = request.POST.get('loginEmail')
        senha = request.POST.get('loginSenha')
        
        try:
            aluno = Aluno.objects.get(email=email)
            if aluno.senha == senha:
                request.session['aluno_id'] = aluno.id
                return redirect('loginA')
            messages.error(request, 'Senha incorreta')
        except Aluno.DoesNotExist:
            messages.error(request, 'Email não encontrado')
    return render(request, 'loginAluno.html')

def criar_turma(request):
    if request.method == 'POST':
        nome_turma = request.POST.get('nome_turma')
        alunos_ids = request.POST.getlist('aluno')
        if nome_turma and alunos_ids:
            turma = Turma.objects.create(nome=nome_turma)
            alunos = Aluno.objects.filter(id__in=alunos_ids)
            turma.alunos.set(alunos)
            turma.save()
        return redirect('perfil_professor')

def home(request):
    return render(request, 'landingPage.html')

def busca(request):
    professores = Professor.objects.all()
    return render(request, 'busca.html', {'professores': professores})

def agendar_aula(request):
    if request.method == 'POST':
        professor_id = request.POST.get('professor_id')  # Id do professor selecionado
        data = request.POST.get('data')
        horarios = request.POST.getlist('horarios[]')
        materia = request.POST.get('materia')
        duvidas = request.POST.get('duvidas')

        # Validações e processamento
        if not data:
            messages.error(request, 'Selecione uma data.')
        elif not horarios:
            messages.error(request, 'Adicione pelo menos um horário.')
        elif not materia:
            messages.error(request, 'Selecione uma matéria.')
        else:
            professor = Professor.objects.get(id=professor_id)
            horarios_disponiveis = professor.horarios.filter(dia=data)

            if horarios_disponiveis.exists():
                # Salvar no banco ou realizar alguma ação com os dados
                messages.success(request, 'Aula agendada com sucesso!')
            else:
                messages.error(request, 'Nenhum horário disponível para a data selecionada.')
        
    professores = Professor.objects.all()  # Lista de professores para seleção
    return render(request, 'agendamento.html', {'professores': professores})
