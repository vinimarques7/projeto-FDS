let SubmitMenu = document.getElementById('menu-abrir')
let menu = document.getElementById('menu-mobile')

SubmitMenu.addEventListener('click', () => {
    menu.classList.add('abrir-menu')
})

menu.addEventListener('click', () => {
    menu.classList.remove('abrir-menu')
})

const checkboxes = document.querySelectorAll('.filter-checkbox');
const items = document.querySelectorAll('#item-list li');

// Listen for changes on any checkbox
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const selectedFilters = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value.toLowerCase());

        filterItems(selectedFilters);
    });
});

// Filter the items based on all selected filters (AND logic)
function filterItems(selectedFilters) {
    items.forEach(function (item) {
        const itemTypes = item.getAttribute('data-type').toLowerCase().split(' ');

        // Check if the item matches all selected filters
        const matchesAllFilters = selectedFilters.every(filter => itemTypes.includes(filter));

        if (matchesAllFilters || selectedFilters.length === 0) {
            item.style.display = 'block';  // Show item if it matches all filters
        } else {
            item.style.display = 'none';   // Hide if it doesn't match all filters
        }
    });
}
