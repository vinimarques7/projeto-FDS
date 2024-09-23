document.addEventListener("DOMContentLoaded", function () {
    const dropdownBtn = document.querySelector(".dropdown-btn");
    const dropdownCheckbox = document.querySelector(".dropdown-checkbox");

    dropdownBtn.addEventListener("click", function () {
        dropdownCheckbox.classList.toggle("show-dropdown");
    });
});

document.querySelectorAll('.dropdown-btn').forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();
    });
});

document.querySelectorAll('.dropdown-btn').forEach(btn => {
    btn.addEventListener('click', event => {
        event.stopPropagation();
        btn.parentNode.classList.toggle('show-dropdown');
    });
});

const dropdownBtns = document.querySelectorAll('.dropdown-btn');
const dropdownLists = document.querySelectorAll('.dropdown-list');

dropdownBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        dropdownLists[index].classList.toggle('show');
    });
});