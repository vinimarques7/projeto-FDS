document.querySelectorAll('.dropdown-btn').forEach((btn) => {
	btn.addEventListener('click', (event) => {
		event.preventDefault();
		event.stopPropagation();
		btn.parentNode.classList.toggle('show-dropdown');
	});
});

function updateRange(element) {
	const value = element.value;
	const rangeValue = document.getElementById('rangeValue');

	// Atualiza a posição do número para ficar sobre a bolinha
	const percent = ((value - element.min) / (element.max - element.min)) * 100;
	const offset = (percent * (element.offsetWidth - 15)) / 100; // Subtraímos o tamanho do thumb (15px) para ajustar

	rangeValue.style.left = `calc(${percent}% - 7.5px)`; // Move o número centralizado na bolinha
	rangeValue.innerText = value; // Atualiza o número exibido

	// Atualiza o fundo da barra
	element.style.background = `linear-gradient(to right, #6f42c1 ${percent}%, #ddd ${percent}%)`;
}