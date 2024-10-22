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
