document.addEventListener('DOMContentLoaded', function () {
    const horariosDataElement = document.getElementById('horarios-data');
    const horarios = JSON.parse(horariosDataElement.getAttribute('data-horarios'));
    const selectedDateInput = document.getElementById('data-selecionada');
    const availableTimesElement = document.getElementById('available-times');
    let selectedTimes = [];

    // Define a data mínima como o dia atual
    const today = new Date().toISOString().split('T')[0];
    selectedDateInput.setAttribute('min', today);

    // Exibe os horários disponíveis ao selecionar uma data
    selectedDateInput.addEventListener('change', function () {
        const selectedDate = new Date(selectedDateInput.value);
        const selectedDayOfWeek = selectedDate.toLocaleString('pt-BR', { weekday: 'long' }).toLowerCase();
        console.log("Dia selecionado:", selectedDayOfWeek);  // Verifique se o dia da semana corresponde corretamente

        document.getElementById('selected-date').innerText = selectedDateInput.value;
        document.getElementById('data-selecionada-oculto').value = selectedDateInput.value;

        // Filtra os horários com base no dia da semana selecionado
        const horariosDisponiveis = horarios.filter(horario => horario.dia.toLowerCase() === selectedDayOfWeek);
        availableTimesElement.innerHTML = '';

        if (horariosDisponiveis.length > 0) {
            horariosDisponiveis.forEach(horario => {
                let inicio = new Date(`1970-01-01T${horario.inicio}:00`);
                let fim = new Date(`1970-01-01T${horario.fim}:00`);
                

                while (inicio < fim) {
                    const timeSlot = document.createElement('div');
                    timeSlot.classList.add('time-slot', 'badge', 'badge-primary', 'mr-2', 'mb-2');
                    timeSlot.setAttribute('data-time', inicio.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
                    timeSlot.innerText = `${inicio.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
                    availableTimesElement.appendChild(timeSlot);
                    inicio.setMinutes(inicio.getMinutes() + 60);  // Intervalo de 1 hora
                }
            });
        } else {
            availableTimesElement.innerText = 'Nenhum horário disponível.';
        }
    });

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

    // Exibe mensagem de confirmação ao agendar
    document.getElementById('agendar-form').addEventListener('submit', function (e) {
        e.preventDefault();
        document.getElementById('confirmacao-mensagem').style.display = 'block';
    });
});
