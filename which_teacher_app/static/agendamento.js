let SubmitMenu = document.getElementById('menu-abrir')
let menu = document.getElementById('menu-mobile')

SubmitMenu.addEventListener('click', () => {
    menu.classList.add('abrir-menu')
})

menu.addEventListener('click', () => {
    menu.classList.remove('abrir-menu')
})

document.addEventListener('DOMContentLoaded', function () {
    const horarioInput = document.getElementById('horario-input');
    const addHorarioBtn = document.getElementById('add-horario');
    const horariosContainer = document.getElementById('horarios-container');
    const horariosInput = document.getElementById('horarios-input');

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
        horariosInput.value = horarios.join(',');
    }
});
