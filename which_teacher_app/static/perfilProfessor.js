document.querySelector('.btn-primary').addEventListener('click', function () {
    const nomeTurma = document.querySelector('.nome').value;
    if (nomeTurma) {
        const container = document.getElementById('turma-criada-container');
        container.innerHTML = `<p>Turma criada: ${nomeTurma}</p>`;
        // Fechar o modal após criar a turma
        const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
        modal.hide();
    }
});