document.addEventListener('DOMContentLoaded', function () {
    const horarioInput = document.getElementById('horario-input');
    const addHorarioBtn = document.getElementById('add-horario');
    const horariosContainer = document.getElementById('horarios-cards');
    const iconHorario = document.getElementById('icon-horario');
    const horariosDisponiveis = document.getElementById('horarios-disponiveis');
    const listaHorarios = document.getElementById('lista-horarios');
    const dataInput = document.getElementById('data');
    const agendarBtn = document.getElementById('agendar-btn'); // Botão de agendar aula

    // Lista de horários disponíveis (exemplo)
    const horarios = ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00'];

    // Função para carregar os horários disponíveis
    function carregarHorarios() {
        horarios.forEach(horario => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            li.innerText = horario;
            li.addEventListener('click', () => {
                horarioInput.value = horario; // Preencher o input com o horário selecionado
                horariosDisponiveis.style.display = 'none'; // Ocultar a aba
                li.remove(); // Remove o horário selecionado da lista
            });
            listaHorarios.appendChild(li);
        });
    }

    // Carregar os horários disponíveis ao iniciar
    carregarHorarios();

    // Exibir ou ocultar a aba de horários disponíveis ao clicar no ícone
    iconHorario.addEventListener('click', () => {
        horariosDisponiveis.style.display = horariosDisponiveis.style.display === 'none' ? 'block' : 'none';
    });

    addHorarioBtn.addEventListener('click', function () {
        adicionarHorario();
    });

    horarioInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            adicionarHorario();
        }
    });

    // Função para agendar a aula
    agendarBtn.addEventListener('click', function () {
        const horariosCadastrados = horariosContainer.children.length;
        if (horariosCadastrados === 0) {
            alert('Por favor, selecione uma data e um horário antes de agendar a aula.');
            return;
        }
        alert('Aula agendada com sucesso!'); // Aqui você pode adicionar a lógica de agendamento
    });

    function adicionarHorario() {
        const horario = horarioInput.value.trim();
        const data = dataInput.value; // Obter a data selecionada

        // Validação de formato de horário
        const horarioRegex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
        if (!data) {
            alert('Por favor, selecione uma data.');
            return;
        }

        if (!horario) {
            alert('Por favor, insira um horário.');
            return;
        }

        if (!horarioRegex.test(horario)) {
            alert('Por favor, insira um horário válido no formato HH:MM.');
            return;
        }

        // Formatação da data para dd-mm-aa
        const dataParts = data.split('-'); // Supondo que a data esteja no formato aaaa-mm-dd
        const dia = dataParts[2]; // Dia
        const mes = dataParts[1]; // Mês
        const ano = dataParts[0].slice(2); // Últimos dois dígitos do ano

        // Cria um cartão para o horário
        const card = document.createElement('div');
        card.classList.add('card', 'mb-2');
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${dia}-${mes}-${ano} - ${horario}</h5> 
                <button class="btn btn-danger btn-remover">Remover</button>
            </div>
        `;

        // Adiciona o cartão ao container
        horariosContainer.appendChild(card);

        // Atualiza o campo oculto com os horários
        const horariosInput = document.getElementById('horarios-input');
        horariosInput.value += horariosInput.value ? ',' + `${dia}-${mes}-${ano} - ${horario}` : `${dia}-${mes}-${ano} - ${horario}`;

        // Limpa o campo de entrada de horário para nova inserção
        // horarioInput.value = ''; // Removido para manter o horário selecionado

        // Adiciona evento para remover o cartão
        const removerBtn = card.querySelector('.btn-remover');
        removerBtn.addEventListener('click', function () {
            horariosContainer.removeChild(card);
            // Atualiza o campo oculto removendo o horário
            atualizarHorariosInput();
            adicionarHorarioDeVolta(data, horario); // Adiciona de volta à lista
        });
    }

    function adicionarHorarioDeVolta(data, horario) {
        // Cria um item na lista de horários disponíveis
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.innerText = horario;
        li.addEventListener('click', () => {
            horarioInput.value = horario; // Preencher o input com o horário selecionado
            horariosDisponiveis.style.display = 'none'; // Ocultar a aba
            li.remove(); // Remove o horário selecionado da lista
        });
        listaHorarios.appendChild(li);
    }

    function atualizarHorariosInput() {
        const horarios = Array.from(horariosContainer.children)
            .map(card => card.querySelector('.card-title').innerText);
        const horariosInput = document.getElementById('horarios-input');
        horariosInput.value = horarios.join(',');
    }
});
