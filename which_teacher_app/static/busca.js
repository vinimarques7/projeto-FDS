const checkboxes = document.querySelectorAll('.filter-checkbox');
const items = document.querySelectorAll('#item-list .col-md-12');

// Escutar mudanças em qualquer checkbox
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const selectedFilters = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value.toLowerCase());

        filterItems(selectedFilters);
    });
});

// Função que faz a filtragem
function filterItems(selectedFilters) {
    items.forEach(function (item) {
        const itemTypes = item.getAttribute('data-type').toLowerCase().split(' ');

        // Verifica se o item corresponde a todos os filtros selecionados
        const matchesAllFilters = selectedFilters.every(filter => itemTypes.includes(filter));

        if (matchesAllFilters || selectedFilters.length === 0) {
            item.style.display = 'block';  // Exibe o item se ele corresponde a todos os filtros
        } else {
            item.style.display = 'none';   // Esconde se não corresponde
        }
    });
}
