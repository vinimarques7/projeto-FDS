
from django.shortcuts import render, redirect, get_object_or_404
from .models import Professor, Horario,Aluno, Turma, Lembrete
from django.contrib import messages


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


       # Verifica se o email já está cadastrado
        if Professor.objects.filter(email=email).exists():
            messages.error(request, 'Este email já está cadastrado. Por favor, utilize outro email.')
            return render(request, 'cadastroProfessor.html')

        # Criação do novo professor

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


        # Redireciona para a página de login
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
    turmas = Turma.objects.filter(professor=professor)

    if request.method == 'POST':
        # Lógica para lembretes
        if 'lembrete_texto' in request.POST:
            lembrete_texto = request.POST.get('lembrete_texto')
            if lembrete_texto:
                try:
                    Lembrete.objects.create(texto=lembrete_texto)
                    messages.success(request, 'Lembrete adicionado com sucesso!')
                except Exception as e:
                    messages.error(request, 'Erro ao adicionar lembrete: ' + str(e))
            return redirect('perfilP')

        # Lógica para deletar lembretes
        elif 'delete_lembrete' in request.POST:
            lembrete_id = request.POST.get('delete_lembrete')
            try:
                lembrete = get_object_or_404(Lembrete, id=lembrete_id)
                lembrete.delete()
                messages.success(request, 'Lembrete apagado com sucesso!')
            except Exception as e:
                messages.error(request, 'Erro ao apagar lembrete: ' + str(e))
            return redirect('perfilP')

        # Lógica para criar uma nova turma
        elif 'nome_turma' in request.POST:
            nome_turma = request.POST.get('nome_turma')
            materia = request.POST.get('materia')
            alunos_ids = request.POST.getlist('alunos')
            if nome_turma and materia and alunos_ids:
                try:
                    turma = Turma.objects.create(nome=nome_turma, materia=materia, professor=professor)
                    alunos = Aluno.objects.filter(id__in=alunos_ids)
                    turma.alunos.set(alunos)
                    turma.save()
                    messages.success(request, 'Turma criada com sucesso!')
                except Exception as e:
                    messages.error(request, 'Erro ao criar turma: ' + str(e))
            return redirect('perfilP')

        # Lógica para remover turma
        elif 'remover_turma' in request.POST:
            turma_id = request.POST.get('remover_turma')
            try:
                turma = get_object_or_404(Turma, id=turma_id)
                turma.delete()
                messages.success(request, 'Turma removida com sucesso!')
            except Exception as e:
                messages.error(request, 'Erro ao remover a turma: ' + str(e))
            return redirect('perfilP')

    lembretes = Lembrete.objects.all().order_by('-data_criacao')

    return render(request, 'perfilProfessor.html', {
        'professor': professor,
        'horarios': horarios,
        'alunos': alunos,
        'lembretes': lembretes,
        'turmas': turmas  # Passar as turmas para o template
    })




def cadastro_aluno(request):
    if request.method == 'POST':
        nome = request.POST.get('nome')
        celular = request.POST.get('celular')
        email = request.POST.get('email')
        senha = request.POST.get('senha')
        nivel_ensino = request.POST.getlist('nivel_ensino')
        idade = request.POST.get('idade')
        genero = request.POST.get('genero')

        if Aluno.objects.filter(email=email).exists():
            messages.error(request, 'Este email já está cadastrado. Por favor, utilize outro email.')
            return render(request, 'cadastroAluno.html')

        aluno = Aluno(
            nome=nome,
            celular=celular,
            email=email,
            senha=senha,
            nivel_ensino=', '.join(nivel_ensino),
            idade = idade,
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
                return redirect('busca')
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

def editarP(request):
    professor_id = request.session.get('professor_id')
    professor = get_object_or_404(Professor, id=professor_id)

    if request.method == 'POST':
        # Verificando se o botão de remover horário foi acionado
        if 'remover_horario_id' in request.POST:
            horario_id = request.POST.get('remover_horario_id')
            horario = get_object_or_404(Horario, id=horario_id, professor=professor)
            horario.delete()
            messages.success(request, 'Horário removido com sucesso!')
            return redirect('editarP')

        # Atualizando os campos do professor
        professor.nome = request.POST.get('nome')
        professor.email = request.POST.get('email')
        
        # Capturando as matérias selecionadas no formulário
        materias_selecionadas = request.POST.getlist('materia')
        
        if materias_selecionadas:
            # Atualizar as matérias somente se houver seleção
            professor.materia = ','.join(materias_selecionadas)  # Converte a lista de matérias em string
        else:
            # Preservar as matérias atuais se não houver novas seleções
            messages.info(request, 'Nenhuma matéria selecionada, as matérias anteriores foram mantidas.')

        professor.celular = request.POST.get('celular')

        # Atualizando imagem, se houver
        if 'imagem' in request.FILES:
            professor.imagem = request.FILES['imagem']

        # Adicionando novo horário
        if 'dia' in request.POST and 'hora_inicio' in request.POST and 'hora_fim' in request.POST:
            dia = request.POST.get('dia')
            hora_inicio = request.POST.get('hora_inicio')
            hora_fim = request.POST.get('hora_fim')
            try:
                Horario.objects.create(professor=professor, dia=dia, hora_inicio=hora_inicio, hora_fim=hora_fim)
                messages.success(request, 'Horário adicionado com sucesso!')
                return redirect('editarP')
            except Exception as e:
                messages.error(request, 'Erro ao adicionar horário: ' + str(e))

        # Salvando o professor com as alterações feitas
        professor.save()
        messages.success(request, 'Perfil atualizado com sucesso!')
        return redirect('perfilP')

    # Carregar os horários do professor
    horarios = professor.horarios.all()

    return render(request, 'editarPerfil.html', {'professor': professor, 'horarios': horarios})


def home(request):
    return render(request, 'landingPage.html')

def publicoP(request, professor_id):
    professor = get_object_or_404(Professor, pk=professor_id)
    return render(request, 'perfilpublicoP.html', {'professor': professor})

def busca(request):
    professores = Professor.objects.all()
    return render(request, 'busca.html', {'professores': professores})

def avaliar(request, professor_id):
    professor = get_object_or_404(Professor, pk=professor_id)
    return render(request, 'avaliacao.html', {'professor': professor})