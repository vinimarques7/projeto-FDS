
from django.shortcuts import render, redirect, get_object_or_404
from .models import Professor, Aluno, Turma, Lembrete, Avaliacao,Agendamento,ObjetivoEstudo, TarefaObjetivo
from django.contrib import messages
from datetime import datetime
from django.contrib.auth.decorators import login_required
from django.db.models import Avg


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

    alunos = Aluno.objects.all()
    turmas = Turma.objects.filter(professor=professor)

    if request.method == 'POST':
        # Lógica para lembretes (já existente)
        if 'lembrete_texto' in request.POST:
            lembrete_texto = request.POST.get('lembrete_texto').strip()
            if not lembrete_texto:
                messages.error(request, 'O lembrete não pode estar vazio.')
            elif len(lembrete_texto) > 255:
                messages.error(request, 'O lembrete não pode ultrapassar 255 caracteres.')
            else:
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


        # Salvando o professor com as alterações feitas
        professor.save()
        messages.success(request, 'Perfil atualizado com sucesso!')
        return redirect('perfilP')


    return render(request, 'editarPerfil.html', {'professor': professor})





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
    
    # Obtenha todas as turmas associadas ao professor
    turmas = Turma.objects.filter(professor=professor)
    
    # Obtenha todas as avaliações do professor e calcule a média de estrelas
    reviews = Avaliacao.objects.filter(professor=professor)
    media_estrelas = reviews.aggregate(Avg('estrelas'))['estrelas__avg'] or 0

    # Renderize o template com o professor, as turmas, as avaliações e a média de estrelas
    return render(request, 'perfilpublicoP.html', {
        'professor': professor,
        'turmas': turmas,
        'reviews': reviews,
        'media_estrelas': round(media_estrelas, 1)  # Arredonda para uma casa decimal
    })
   

def cadastroP(request):
    return render(request, 'cadastroProfessor.html')

def busca(request):
    professores = Professor.objects.all().annotate(media_estrelas=Avg('avaliacao__estrelas'))
    aluno_id = request.session.get('aluno_id')
    aluno = None

    if aluno_id:
        aluno = get_object_or_404(Aluno, id=aluno_id)
    
    return render(request, 'busca.html', {
        'professores': professores,
        'aluno': aluno
    })



def agendar_aula(request, professor_id):
    # Obter o professor correspondente
    professor = get_object_or_404(Professor, id=professor_id)

    # Extrair os meios de comunicação e pagamento do professor
    meios_transmissao = professor.comunicacao.split(',')
    meios_pagamento = professor.recebimento.split(',')

    # Verificar se o aluno está autenticado através da sessão
    aluno_id = request.session.get('aluno_id')
    if not aluno_id:
        return redirect('loginA')

    aluno = get_object_or_404(Aluno, id=aluno_id)

    if request.method == "POST":
        # Capturar os valores do formulário
        data_selecionada = request.POST.get("data_selecionada")
        meio_transmissao = request.POST.get("meio_transmissao")
        meio_pagamento = request.POST.get("meio_pagamento")
        comentarios = request.POST.get("comentarios")

        # Debug: verificar os valores recebidos
        print("Data Selecionada:", data_selecionada)
        print("Meio de Transmissão:", meio_transmissao)
        print("Meio de Pagamento:", meio_pagamento)
        print("Comentários:", comentarios)

         # Lista para acumular mensagens de erro
        erros = []

        if not data_selecionada and not meio_transmissao and not meio_pagamento and not comentarios:
            messages.error(request, "Por favor, preencha todos os campos obrigatórios.")
            return redirect("agendar_aula", professor_id=professor.id)

        # Verificações de cada campo obrigatório e acumulação de erros específicos
        if not data_selecionada:
            erros.append("Por favor, selecione um dia para o agendamento.")
        
        if not meio_transmissao:
            erros.append("Por favor, selecione um meio de transmissão para o agendamento.")
        
        if not meio_pagamento:
            erros.append("Por favor, selecione um meio de pagamento para o agendamento.")
        
        if not comentarios:
            erros.append("Por favor, insira um comentário para o professor.")

        # Se algum erro foi encontrado, exibe todas as mensagens de erro acumuladas
        if erros:
            for erro in erros:
                messages.error(request, erro)
            return redirect("agendar_aula", professor_id=professor.id)

        try:
            # Criar um novo agendamento no banco de dados
            agendamento = Agendamento.objects.create(
                professor=professor,
                aluno=aluno,
                data=data_selecionada,
                meio_transmissao=meio_transmissao,
                meio_pagamento=meio_pagamento,
                comentarios=comentarios
            )
            agendamento.save()
            messages.success(request, "Agendamento realizado com sucesso!")
            return redirect("publicoP", professor_id=professor.id)
        except Exception as e:
            messages.error(request, f"Ocorreu um erro ao salvar o agendamento: {e}")
            return redirect("agendar_aula", professor_id=professor.id)

    return render(request, "agendamento.html", {
        "professor": professor,
        "meios_transmissao": meios_transmissao,
        "meios_pagamento": meios_pagamento,
    })


def agendar_sucesso(request, professor_id):
    # Aqui você pode passar informações do professor para a template, se necessário
    professor = get_object_or_404(Professor, id=professor_id)
    
    return render(request, "agendar_sucesso.html", {
        "professor": professor,
    })
 
def avaliacao(request, professor_id):
    aluno_id = request.session.get('aluno_id')

    if not aluno_id:
        messages.warning(request, "Por favor, faça login para enviar uma avaliação.")
        return redirect('loginA')

    aluno = get_object_or_404(Aluno, id=aluno_id)
    nome_aluno = aluno.nome
    professor = get_object_or_404(Professor, id=professor_id)

    # Verifique se uma avaliação já existe para esse aluno e professor
    avaliacao_existente = Avaliacao.objects.filter(professor=professor, id_aluno=aluno.id).first()

    if avaliacao_existente:
        messages.info(request, "Você já enviou uma avaliação para este professor.")
        return redirect('publicoP', professor_id=professor.id)

    if request.method == 'POST':
        estrelas = request.POST.get('rating')
        comentario = request.POST.get('comment')

        if not estrelas and not comentario:
            messages.error(request, 'Avaliação não enviada: a avaliação e o comentário estão vazios.')
        elif not estrelas:
            messages.error(request, 'Avaliação não enviada: por favor, forneça uma avaliação de estrelas.')
        elif not comentario:
            messages.error(request, 'Avaliação não enviada: por favor, forneça um comentário.')
        else:
            try:
                # Salvar a avaliação no banco de dados
                Avaliacao.objects.create(
                    professor=professor,
                    estrelas=estrelas,
                    comentario=comentario,
                    id_aluno=aluno.id,
                    nome_aluno=nome_aluno
                )
                messages.success(request, "Sua avaliação foi enviada com sucesso!")
                return redirect('publicoP', professor_id=professor.id)
            except Exception as e:
                messages.error(request, f"Ocorreu um erro ao salvar sua avaliação. Tente novamente mais tarde. Erro: {e}")

    return render(request, 'avaliacao.html', {
        'aluno': aluno,
        'professor': professor,
    })

def perfil_aluno(request):
    aluno_id = request.session.get('aluno_id')
    aluno = get_object_or_404(Aluno, id=aluno_id)

    if request.method == 'POST':
        # Adicionar novo objetivo de estudo
        if 'novo_objetivo' in request.POST:
            descricao = request.POST.get('novo_objetivo')
            if descricao:
                # Verifica se o objetivo já existe para o aluno
                if ObjetivoEstudo.objects.filter(aluno=aluno, descricao=descricao).exists():
                    messages.error(request, "Este objetivo de estudo já foi adicionado.")
                else:
                    ObjetivoEstudo.objects.create(aluno=aluno, descricao=descricao)
                    messages.success(request, "Objetivo de estudo adicionado com sucesso!")
            else:
                messages.error(request, "Por favor, insira uma descrição para o objetivo de estudo.")
            return redirect('perfil_aluno')  # Redireciona após o POST

        # Remover objetivo de estudo
        elif 'remover_objetivo' in request.POST:
            objetivo_id = request.POST.get('remover_objetivo')
            objetivo = get_object_or_404(ObjetivoEstudo, id=objetivo_id, aluno=aluno)
            objetivo.delete()
            messages.success(request, "Objetivo de estudo removido com sucesso!")
            return redirect('perfil_aluno')  # Redireciona após o POST

        # Adicionar nova tarefa ao objetivo específico
        elif 'nova_tarefa' in request.POST:
            objetivo_id = request.POST.get('objetivo_id')
            descricao_tarefa = request.POST.get('nova_tarefa')
            objetivo = get_object_or_404(ObjetivoEstudo, id=objetivo_id, aluno=aluno)
            if descricao_tarefa:
                # Verifica se a tarefa já existe para o objetivo
                if TarefaObjetivo.objects.filter(objetivo=objetivo, descricao=descricao_tarefa).exists():
                    messages.error(request, "Esta tarefa já foi adicionada ao objetivo.")
                else:
                    TarefaObjetivo.objects.create(objetivo=objetivo, descricao=descricao_tarefa)
                    messages.success(request, "Tarefa adicionada ao objetivo de estudo!")
            else:
                messages.error(request, "Por favor, insira uma descrição para a tarefa.")
            return redirect('perfil_aluno')  # Redireciona após o POST

        # Marcar tarefa como concluída ou não concluída
        elif 'concluir_tarefa' in request.POST:
            tarefa_id = request.POST.get('concluir_tarefa')
            tarefa = get_object_or_404(TarefaObjetivo, id=tarefa_id, objetivo__aluno=aluno)
            tarefa.concluida = not tarefa.concluida
            tarefa.save()
            tarefa.objetivo.calcular_progresso()
            messages.success(request, "Tarefa atualizada com sucesso!")
            return redirect('perfil_aluno')  # Redireciona após o POST

        # Apagar tarefa
        elif 'apagar_tarefa' in request.POST:
            tarefa_id = request.POST.get('apagar_tarefa')
            tarefa = get_object_or_404(TarefaObjetivo, id=tarefa_id, objetivo__aluno=aluno)
            objetivo = tarefa.objetivo
            tarefa.delete()
            objetivo.calcular_progresso()
            messages.success(request, "Tarefa removida com sucesso!")
            return redirect('perfil_aluno')  # Redireciona após o POST

    objetivos = aluno.objetivos.all()
    return render(request, 'perfil_aluno.html', {'aluno': aluno, 'objetivos': objetivos})

def editar_aluno(request):
    aluno_id = request.session.get('aluno_id')
    aluno = get_object_or_404(Aluno, id=aluno_id)

    if request.method == 'POST':
        # Atualizando os campos do aluno
        aluno.nome = request.POST.get('nome')
        aluno.email = request.POST.get('email')


        aluno.celular = request.POST.get('celular')

        # Atualizando imagem, se houver
        if 'imagem' in request.FILES:
            aluno.imagem = request.FILES['imagem']

        # Salvando o aluno com as alterações feitas
        aluno.save()
        messages.success(request, 'Perfil atualizado com sucesso!')
        return redirect('perfil_aluno')

    return render(request, 'editar_aluno.html', {'aluno': aluno})