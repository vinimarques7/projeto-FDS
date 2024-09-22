document.addEventListener("DOMContentLoaded", function () {
    const dropdownBtn = document.querySelector(".dropdown-btn");
    const dropdownCheckbox = document.querySelector(".dropdown-checkbox");

    dropdownBtn.addEventListener("click", function () {
        dropdownCheckbox.classList.toggle("show-dropdown");
    });
});