const filterButtons = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('#item-list .col-md-3');
const scrollWrapper = document.querySelector('.scrolling-wrapper');
const scrollRightBtn = document.querySelector('.scroll-right');
const scrollLeftBtn = document.querySelector('.scroll-left');

// Função para rolar à direita
scrollRightBtn.addEventListener('click', () => {
    scrollWrapper.scrollBy({ left: 300, behavior: 'smooth' });
});

// Função para rolar à esquerda
scrollLeftBtn.addEventListener('click', () => {
    scrollWrapper.scrollBy({ left: -300, behavior: 'smooth' });
});

// Função de filtragem ao clicar nos ícones
filterButtons.forEach(button => {
    button.addEventListener('click', function () {
        const selectedSubject = button.getAttribute('data-subject').toLowerCase();

        // Filtrar itens de acordo com a matéria selecionada
        filterItemsBySubject(selectedSubject);
    });
});

function filterItemsBySubject(selectedSubject) {
    items.forEach(function (item) {
        const itemSubject = item.getAttribute('data-type').toLowerCase();

        if (itemSubject.includes(selectedSubject)) {
            item.style.display = 'block';  // Exibe o item se a matéria corresponder
        } else {
            item.style.display = 'none';   // Esconde se não corresponder
        }
    });
}

// Function to open the modal and populate data
function openModal(teacherCard) {
    // Extract teacher details from the card
    const name = teacherCard.querySelector('.card-title').innerText;
    const subject = teacherCard.querySelector('.badge').innerText;
    const details = teacherCard.querySelector('.card-text').innerText;
    const imageSrc = teacherCard.querySelector('img').src;

    // Populate the modal with the extracted information
    document.getElementById('modal-teacher-name').innerText = name;
    document.getElementById('modal-teacher-subject').innerHTML = `<strong>Matéria(s):</strong> ${subject}`;
    document.getElementById('modal-teacher-details').innerText = details;
    document.getElementById('modal-teacher-image').src = imageSrc;

    // Trigger Bootstrap modal to open
    $('#teacherModal').modal('show');

    // // Handle "Schedule Class" button click
    // document.getElementById('schedule-class-btn').onclick = () => {
    //     window.location.href = `/schedule-class?teacher=${encodeURIComponent(name)}`;
    // };

    // // Handle "Write a Review" button click (redirect)
    // document.getElementById('write-review-btn').onclick = () => {
    //     window.location.href = `/write-review?teacher=${encodeURIComponent(name)}`;
    // };
}

// Add event listeners to each teacher card to open the modal on click
const teacherCards = document.querySelectorAll('.col-md-3 .card');
teacherCards.forEach(card => {
    card.addEventListener('click', () => openModal(card));
});