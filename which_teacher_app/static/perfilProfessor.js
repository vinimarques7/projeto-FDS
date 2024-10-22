let SubmitMenu = document.getElementById('menu-abrir')
let menu = document.getElementById('menu-mobile')

SubmitMenu.addEventListener('click',()=>{
    menu.classList.add('abrir-menu')
})

menu.addEventListener('click',()=>{
    menu.classList.remove('abrir-menu')
})

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

document.querySelector('.btn-primary').addEventListener('click', function () {
    const nomeTurma = document.querySelector('.nome').value;
    const materia = document.querySelector('input[name="materia"]:checked')?.value;
    const assunto = document.querySelector('input[name="assunto"]:checked')?.value;

    if (nomeTurma && materia && assunto) {
        const container = document.getElementById('turma-criada-container');

        // Criar o card Bootstrap com as informações da turma
        const cardHtml = `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${nomeTurma}</h5>
                        <p class="card-text"><strong>Matéria:</strong> ${materia}</p>
                        <p class="card-text"><strong>Assunto:</strong> ${assunto}</p>
                    </div>
                </div>
            </div>
        `;

        // Inserir o card no container
        container.innerHTML += cardHtml;

        // Fechar o modal após criar a turma
        const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
        modal.hide();

        // Limpar os campos do modal
        document.querySelector('.nome').value = '';
        document.querySelector('input[name="materia"]:checked').checked = false;
        document.querySelector('input[name="assunto"]:checked').checked = false;
    } else {
        alert('Por favor, preencha todos os campos!');
    }
});
