document.addEventListener('DOMContentLoaded', function () {
    const observacoesInput = document.getElementById('observacoes'); // Campo de observações
    const agendarBtn = document.getElementById('agendar-btn'); // Botão de agendar aula
    const mensagemSemHorarios = document.getElementById('mensagem-sem-horarios'); // Mensagem de nenhum horário

    // Função para verificar horários disponíveis
    function verificarHorarios() {
        const diaSelecionado = document.querySelector('input[name="dia"]:checked'); // Obter o dia selecionado
        if (!diaSelecionado) return; // Retornar se nenhum dia estiver selecionado

        const dia = diaSelecionado.value; // Obter o valor do dia selecionado
        const listaHorarios = document.getElementById('lista-horarios');
        const horarios = Array.from(listaHorarios.getElementsByTagName('li'));

        const horariosDisponiveis = horarios.filter(horario => {
            return horario.innerText.startsWith(dia.charAt(0).toUpperCase() + dia.slice(1));
        });

        if (horariosDisponiveis.length === 0) {
            mensagemSemHorarios.style.display = 'block'; // Mostrar mensagem se não houver horários
        } else {
            mensagemSemHorarios.style.display = 'none'; // Ocultar mensagem se houver horários
        }
    }

    // Adicionar evento para os botões de rádio
    const radioButtons = document.querySelectorAll('input[name="dia"]');
    radioButtons.forEach(button => {
        button.addEventListener('change', verificarHorarios);
    });

    // Função para agendar a aula
    agendarBtn.addEventListener('click', function () {
        const observacoes = observacoesInput.value.trim(); // Obter o conteúdo do campo de observações

        // Validação dos campos
        if (!observacoes) {
            alert('Por favor, insira suas dúvidas antes de agendar a aula.');
            return;
        }

        // Verificar se há horários disponíveis para o dia selecionado
        const diaSelecionado = document.querySelector('input[name="dia"]:checked'); // Obter o dia selecionado
        if (!diaSelecionado) {
            alert('Por favor, selecione um dia da semana.');
            return;
        }

        alert('Aula agendada para ' + diaSelecionado.value + ' com sucesso! Suas dúvidas: ' + observacoes); // Aqui você pode adicionar a lógica de agendamento
    });
});
