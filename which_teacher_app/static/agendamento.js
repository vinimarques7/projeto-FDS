document.addEventListener('DOMContentLoaded', function () {
    const selectedDateInput = document.getElementById('data-selecionada');

    // Definir data mínima para hoje
    const today = new Date().toISOString().split('T')[0];
    selectedDateInput.setAttribute('min', today);

    const availableTimesElement = document.getElementById('available-times');
    const meioTransmissaoSelect = document.getElementById('meio-transmissao');
    const meioPagamentoSelect = document.getElementById('meio-pagamento');
    const errorMessage = document.getElementById('error-message');
    const confirmacaoMensagem = document.getElementById('confirmacao-mensagem');
    let selectedTimes = [];

    // Permite seleção múltipla de horários
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
            document.getElementById('horarios-selecionados').value = selectedTimes.join(', ');
        }
    });

    // Validação do formulário ao submeter
    document.getElementById('agendar-form').addEventListener('submit', function (e) {
        e.preventDefault();  // Evita o envio do formulário

        // Verifica se todos os campos obrigatórios foram preenchidos
        const selectedDate = selectedDateInput.value;
        const selectedHorario = selectedTimes.length > 0;
        const meioTransmissao = meioTransmissaoSelect.value;
        const meioPagamento = meioPagamentoSelect.value;

        if (!selectedDate || !selectedHorario) {
            errorMessage.innerText = "O dia e o horário são obrigatórios para o agendamento.";
            errorMessage.style.display = 'block';
            return;
        }

        if (!meioTransmissao || !meioPagamento) {
            errorMessage.innerText = "A escolha do meio de transmissão e do meio de pagamento é obrigatória.";
            errorMessage.style.display = 'block';
            return;
        }

        // Oculta a mensagem de erro e exibe a confirmação se tudo estiver preenchido
        errorMessage.style.display = 'none';
        confirmacaoMensagem.style.display = 'block';
        this.submit();  // Envia o formulário após validação
    });
});
