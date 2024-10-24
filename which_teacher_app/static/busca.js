const filterButtons = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('#item-list .col-md-3');
const scrollWrapper = document.querySelector('.scrolling-wrapper');
const scrollRightBtn = document.querySelector('.scroll-right');
const scrollLeftBtn = document.querySelector('.scroll-left');
let activeFilter = null; // Variável para armazenar o filtro ativo

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

        if (activeFilter === selectedSubject) {
            // Se o filtro já estiver ativo, desative-o e exiba todos os itens
            showAllItems();
            activeFilter = null; // Reseta o filtro ativo
        } else {
            // Se o filtro não estiver ativo, aplique o filtro para a matéria selecionada
            filterItemsBySubject(selectedSubject);
            activeFilter = selectedSubject; // Atualiza o filtro ativo
        }
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

function showAllItems() {
    items.forEach(function (item) {
        item.style.display = 'block';  // Exibe todos os itens
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
}

// Add event listeners to each teacher card to open the modal on click
const teacherCards = document.querySelectorAll('.col-md-3 .card');
teacherCards.forEach(card => {
    card.addEventListener('click', () => openModal(card));
});
