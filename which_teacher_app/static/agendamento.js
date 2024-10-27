document.addEventListener('DOMContentLoaded', function () {
    const horariosDataElement = document.getElementById('horarios-data');
    const horarios = JSON.parse(horariosDataElement.getAttribute('data-horarios'));

    const selectedDateElement = document.getElementById('selected-date');
    const selectedDateInput = document.getElementById('data-selecionada');
    const availableTimesElement = document.getElementById('available-times');
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let selectedTimes = [];

    function renderCalendar(month, year) {
        const monthYear = document.getElementById('month-year');
        const calendarBody = document.getElementById('calendar-body');
        calendarBody.innerHTML = '';

        const firstDay = new Date(year, month).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        monthYear.innerText = new Date(year, month).toLocaleString('pt-BR', { month: 'long', year: 'numeric' });

        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('calendar-day', 'empty');
            calendarBody.appendChild(emptyCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day', 'text-center', 'border', 'rounded');
            dayElement.textContent = day;

            const dayDate = new Date(year, month, day);

            if (dayDate < today) {
                dayElement.classList.add('disabled');
            } else {
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
                            timeSlot.classList.add('time-slot', 'badge', 'badge-primary');
                            timeSlot.setAttribute('data-time', horario.inicio);
                            timeSlot.innerText = `${horario.inicio} até ${horario.fim}`;
                            availableTimesElement.appendChild(timeSlot);

                            timeSlot.addEventListener('click', function () {
                                const time = this.getAttribute('data-time');
                                if (selectedTimes.includes(time)) {
                                    selectedTimes = selectedTimes.filter(t => t !== time);
                                    this.classList.remove('selected');
                                } else {
                                    selectedTimes.push(time);
                                    this.classList.add('selected');
                                }
                                document.getElementById('horarios-selecionados').value = selectedTimes.join(', ');
                            });
                        });
                    } else {
                        availableTimesElement.innerText = 'Nenhum horário disponível.';
                    }
                };
            }

            calendarBody.appendChild(dayElement);
        }
    }

    document.getElementById('prev-month').onclick = function () {
        if (!(currentYear === new Date().getFullYear() && currentMonth === new Date().getMonth())) {
            currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
            currentYear = (currentMonth === 11) ? currentYear - 1 : currentYear;
            renderCalendar(currentMonth, currentYear);
        }
    };

    document.getElementById('next-month').onclick = function () {
        currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
        currentYear = (currentMonth === 0) ? currentYear + 1 : currentYear;
        renderCalendar(currentMonth, currentYear);
    };

    renderCalendar(currentMonth, currentYear);

    document.getElementById('agendar-form').addEventListener('submit', function (e) {
        document.getElementById('data-selecionada').value = selectedDateElement.innerText;
    });
});
