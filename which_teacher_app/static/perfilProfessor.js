document.addEventListener('DOMContentLoaded', function () {
    const SubmitMenu = document.getElementById('menu-abrir');
    const menu = document.getElementById('menu-mobile');

    // Verifica se o elemento 'SubmitMenu' existe antes de adicionar o EventListener
    if (SubmitMenu) {
        SubmitMenu.addEventListener('click', () => {
            if (menu) {
                menu.classList.add('abrir-menu');
            }
        });
    }

    // Verifica se o elemento 'menu' existe antes de adicionar o EventListener
    if (menu) {
        menu.addEventListener('click', () => {
            menu.classList.remove('abrir-menu');
        });
    }

    // Modificando para Bootstrap 3: Verifica se o botão do modal e os outros elementos existem
    const modalButton = document.querySelector('.btn-primary[data-toggle="modal"]');
    if (modalButton) {
        modalButton.addEventListener('click', function () {
            const nomeTurmaInput = document.querySelector('.nome');
            const nomeTurma = nomeTurmaInput ? nomeTurmaInput.value : null;

            if (nomeTurma) {
                const container = document.getElementById('turma-criada-container');
                if (container) {
                    container.innerHTML = `<p>Turma criada: ${nomeTurma}</p>`;

                    // Fechar o modal após criar a turma usando Bootstrap 3
                    $('#myModal').modal('hide');
                }
            }
        });
    }
});
