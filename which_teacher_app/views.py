
from django.shortcuts import render, redirect, get_object_or_404
from .models import Professor, Horario, Aluno, Turma, Lembrete, Avaliacao,Agendamento
from django.contrib import messages
from datetime import datetime


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
        if 'dia_semana' in request.POST and 'hora_inicio' in request.POST and 'hora_fim' in request.POST:
            dia_semana = request.POST.get('dia_semana')
            hora_inicio = request.POST.get('hora_inicio')
            hora_fim = request.POST.get('hora_fim')
            try:
                Horario.objects.create(professor=professor, dia_semana=dia_semana, hora_inicio=hora_inicio, hora_fim=hora_fim)
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

def avaliacao(request):
    aluno_id = request.session.get('aluno_id')
    if aluno_id:
        aluno = Aluno.objects.get(id=aluno_id)
        nome_aluno = aluno.nome
    if request.method == 'POST':
        estrelas = request.POST.get('rating')
        comentario = request.POST.get('comentario')
    success_message = None

    estrelas = None
    comentario = None
    
    if request.method == 'POST':
        estrelas = request.POST.get('rating')
        comentario = request.POST.get('comentario')

        avaliacao = Avaliacao(
            estrelas=estrelas,
            comentario=comentario,
            id_aluno=aluno_id,
            nome_aluno=nome_aluno
        )
        avaliacao.save()  


        success_message = "Avaliação enviada com sucesso!"
    else:
        return redirect('LoginA')



    return render(request, 'avaliacao.html', {'aluno': aluno, 'success_message': success_message})

def publicoP(request, professor_id):
    professor = get_object_or_404(Professor, id=professor_id)
    
    # Obtenha todos os horários associados ao professor
    horarios = Horario.objects.filter(professor=professor)
    turmas= Turma.objects.filter(professor=professor)
     # Exemplo para carregar turmas, caso necessário

    # Renderize o template com o professor, os horários e as turmas
    return render(request, 'perfilpublicoP.html', {
        'professor': professor,
        'horarios': horarios,
        'turmas': turmas
    })
   

def cadastroP(request):
    return render(request, 'cadastroProfessor.html')

def busca(request):
    professores = Professor.objects.all()  
    return render(request, 'busca.html', {'professores': professores})


def agendar_aula(request, professor_id):
    professor = get_object_or_404(Professor, id=professor_id)
    horarios = Horario.objects.filter(professor=professor)

    meios_transmissao = professor.comunicacao.split(',')  # Supondo que os meios sejam separados por vírgula
    meios_pagamento = professor.recebimento.split(',')

    if request.method == "POST":
        data_selecionada = request.POST.get("data_selecionada")
        meio_transmissao = request.POST.get("meio_transmissao")
        meio_pagamento = request.POST.get("meio_pagamento")
        comentarios = request.POST.get("comentarios")

        # Validação dos campos obrigatórios

        if not meio_transmissao or not meio_pagamento:
            messages.error(request, "A escolha do meio de transmissão e do meio de pagamento é obrigatória.")
            return redirect("agendar_aula", professor_id=professor.id)

        # Salvando o agendamento
        try:
            Agendamento.objects.create(
                professor=professor,
                aluno=request.user,  # Certifique-se de que o usuário está autenticado
                data=data_selecionada,
                meio_transmissao=meio_transmissao,
                meio_pagamento=meio_pagamento,
                comentarios=comentarios
            )
            messages.success(request, "Agendamento realizado com sucesso!")
            return redirect("agendar_sucesso", professor_id=professor.id)  # Redireciona para a página de sucesso
        except Exception as e:
            messages.error(request, f"Ocorreu um erro ao salvar o agendamento: {e}")
            return redirect("agendar_aula", professor_id=professor.id)

    return render(request, "agendamento.html", {
        "professor": professor,
        "horarios": horarios,
        "meios_transmissao": meios_transmissao,
        "meios_pagamento": meios_pagamento,
    })


def agendar_sucesso(request, professor_id):
    # Aqui você pode passar informações do professor para a template, se necessário
    professor = get_object_or_404(Professor, id=professor_id)
    
    return render(request, "agendar_sucesso.html", {
        "professor": professor,
    })
 