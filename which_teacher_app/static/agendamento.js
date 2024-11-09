document.addEventListener('DOMContentLoaded', function () {
    const availableTimesElement = document.getElementById('available-times');
    const hiddenTimesInput = document.getElementById('horarios-selecionados');
    const agendarForm = document.getElementById('agendar-form');

    const meioTransmissaoSelect = document.getElementById('meio-transmissao');
    const meioPagamentoSelect = document.getElementById('meio-pagamento');

    let selectedTimes = [];

    // Permite seleção múltipla de horários
    if (availableTimesElement) {
        availableTimesElement.addEventListener('click', function (event) {
            if (event.target.classList.contains('time-slot')) {
                const time = event.target.getAttribute('data-time');
                if (selectedTimes.includes(time)) {
                    selectedTimes = selectedTimes.filter(t => t !== time);
                    event.target.classList.remove('selected');
                } else {
                    selectedTimes.push(time);
                    event.target.classList.add('selected');
                }
                hiddenTimesInput.value = selectedTimes.join(', ');
                console.log("Horários selecionados atualizados:", hiddenTimesInput.value);
            }
        });
    }

    // Garantir que os valores dos campos ocultos sejam atualizados no momento da submissão
    agendarForm.addEventListener('submit', function () {
        // Atualizar o valor dos horários selecionados
        hiddenTimesInput.value = selectedTimes.join(', ');

        console.log("Enviando formulário com:");
        console.log("Horários Selecionados:", hiddenTimesInput.value);

        // Verificar se todos os campos estão preenchidos antes de submeter o formulário
        if (!hiddenTimesInput.value) {
            alert("Por favor, selecione pelo menos um horário.");
            return false;
        }

        if (!meioTransmissaoSelect.value || !meioPagamentoSelect.value) {
            alert("Por favor, preencha os campos de meio de transmissão e meio de pagamento.");
            return false;
        }

        // Caso tudo esteja preenchido, enviar o formulário
        return true;
    });
});
