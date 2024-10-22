document.addEventListener('DOMContentLoaded', function () {
    const horarioInput = document.getElementById('horario-input');
    const addHorarioBtn = document.getElementById('add-horario');
    const horariosContainer = document.getElementById('horarios-container');
    const iconHorario = document.getElementById('icon-horario');
    const horariosDisponiveis = document.getElementById('horarios-disponiveis');
    const listaHorarios = document.getElementById('lista-horarios');

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
            });
            listaHorarios.appendChild(li);
        });
    }

    // Carregar os horários disponíveis ao iniciar
    carregarHorarios();

    // Exibir ou ocultar a aba de horários disponíveis ao clicar no ícone
    iconHorario.addEventListener('click', () => {
        if (horariosDisponiveis.style.display === 'none') {
            horariosDisponiveis.style.display = 'block';
        } else {
            horariosDisponiveis.style.display = 'none';
        }
    });

    addHorarioBtn.addEventListener('click', function () {
        adicionarHorario();
    });

    horarioInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            adicionarHorario();
        }
    });

    function adicionarHorario() {
        const horario = horarioInput.value.trim();

        // Validação de formato de horário
        const horarioRegex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
        if (horarioRegex.test(horario)) {
            // Cria um cartão para o horário
            const card = document.createElement('div');
            card.classList.add('card', 'mb-2');
            card.innerHTML = `
                <div class="card-body d-flex justify-content-between align-items-center">
                    <h5 class="card-title">${horario}</h5>
                    <button class="btn btn-danger btn-remover">Remover</button>
                </div>
            `;

            // Adiciona o cartão ao container
            horariosContainer.appendChild(card);

            // Atualiza o campo oculto com os horários
            const horariosInput = document.getElementById('horarios-input');
            horariosInput.value += horariosInput.value ? ',' + horario : horario;

            // Limpa o campo de entrada
            horarioInput.value = '';

            // Adiciona evento para remover o cartão
            const removerBtn = card.querySelector('.btn-remover');
            removerBtn.addEventListener('click', function () {
                horariosContainer.removeChild(card);
                // Atualiza o campo oculto removendo o horário
                atualizarHorariosInput();
            });
        } else {
            alert('Por favor, insira um horário válido no formato HH:MM.');
        }
    }

    function atualizarHorariosInput() {
        const horarios = Array.from(horariosContainer.children)
            .map(card => card.querySelector('.card-title').innerText);
        const horariosInput = document.getElementById('horarios-input');
        horariosInput.value = horarios.join(',');
    }
});
