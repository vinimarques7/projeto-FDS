let SubmitMenu = document.getElementById('menu-abrir');
let menu = document.getElementById('menu-mobile');

SubmitMenu.addEventListener('click', () => {
	menu.classList.add('abrir-menu');
});

menu.addEventListener('click', () => {
	menu.classList.remove('abrir-menu');
});

// Modificando para Bootstrap 3
document
	.querySelector('.btn-primary[data-toggle="modal"]')
	.addEventListener('click', function () {
		const nomeTurma = document.querySelector('.nome').value;
		if (nomeTurma) {
			const container = document.getElementById('turma-criada-container');
			container.innerHTML = `<p>Turma criada: ${nomeTurma}</p>`;

			// Fechar o modal após criar a turma usando Bootstrap 3
			$('#myModal').modal('hide');
		}
	});