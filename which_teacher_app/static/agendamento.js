document.addEventListener('DOMContentLoaded', function () {
    const horariosDataElement = document.getElementById('horarios-data');
    const horarios = JSON.parse(horariosDataElement.getAttribute('data-horarios'));

    const selectedDateElement = document.getElementById('selected-date');
    const selectedDateInput = document.getElementById('data-selecionada');
    const availableTimesElement = document.getElementById('available-times');
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    function renderCalendar(month, year) {
        const monthYear = document.getElementById('month-year');
        const calendarBody = document.getElementById('calendar-body');
        calendarBody.innerHTML = ''; 

        const firstDay = new Date(year, month).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('calendar-day');
            calendarBody.appendChild(emptyCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = day;
            dayElement.onclick = function () {
                const selectedDate = new Date(year, month, day);
                const selectedDayOfWeek = selectedDate.toLocaleString('pt-BR', { weekday: 'long' });

                selectedDateElement.innerText = `${day}/${month + 1}/${year}`;
                selectedDateInput.value = `${year}-${month + 1}-${day}`;

                const horariosDisponiveis = horarios.filter(horario => horario.dia.toLowerCase() === selectedDayOfWeek.toLowerCase());

                availableTimesElement.innerHTML = '';
                if (horariosDisponiveis.length > 0) {
                    horariosDisponiveis.forEach(horario => {
                        const timeSlot = document.createElement('div');
                        timeSlot.classList.add('time-slot');
                        timeSlot.innerText = `${horario.inicio} até ${horario.fim}`;
                        availableTimesElement.appendChild(timeSlot);
                    });
                } else {
                    availableTimesElement.innerText = 'Nenhum horário disponível.';
                }
            };
            calendarBody.appendChild(dayElement);
        }

        monthYear.innerText = new Date(year, month).toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
    }

    document.getElementById('prev-month').onclick = function () {
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
        currentYear = (currentMonth === 11) ? currentYear - 1 : currentYear;
        renderCalendar(currentMonth, currentYear);
    };

    document.getElementById('next-month').onclick = function () {
        currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
        currentYear = (currentMonth === 0) ? currentYear + 1 : currentYear;
        renderCalendar(currentMonth, currentYear);
    };

    renderCalendar(currentMonth, currentYear);
});
