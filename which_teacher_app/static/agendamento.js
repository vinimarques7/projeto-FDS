document.addEventListener('DOMContentLoaded', function () {
    const diasDaSemana = document.querySelectorAll('input[name="dia"]');
    const horariosDisponiveisDiv = document.getElementById('horarios-disponiveis');
    const listaHorarios = document.getElementById('lista-horarios');

    diasDaSemana.forEach(dia => {
        dia.addEventListener('change', function () {
            const diaSelecionado = this.value; // Obter o dia selecionado

            // Limpa a lista de horários
            listaHorarios.innerHTML = '';

            // Obtém os horários disponíveis para o professor e dia selecionado
            fetch(`/horarios/${professor_id}/${diaSelecionado}/`) // Altere para sua rota
                .then(response => response.json())
                .then(data => {
                    if (data.horarios.length > 0) {
                        // Preenche a lista de horários
                        data.horarios.forEach(horario => {
                            const li = document.createElement('li');
                            li.textContent = `${horario.hora_inicio} até ${horario.hora_fim}`;
                            listaHorarios.appendChild(li);
                        });
                        horariosDisponiveisDiv.style.display = 'block'; // Exibe a seção de horários
                    } else {
                        const li = document.createElement('li');
                        li.textContent = 'Nenhum horário disponível.';
                        listaHorarios.appendChild(li);
                        horariosDisponiveisDiv.style.display = 'block'; // Exibe a seção de horários
                    }
                })
                .catch(error => {
                    console.error('Erro ao obter os horários:', error);
                });
        });
    });
});
