const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

function validarCadastro() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var confirmaSenha = document.getElementById('confirmaSenha').value;

    if (email && senha && confirmaSenha) {
        if (senha === confirmaSenha) {
            window.location.href = '/cadastroP/';
        } else {
            alert('As senhas não coincidem.');
        }
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function validarLogin() {
    var email = document.getElementById('loginEmail').value;
    var senha = document.getElementById('loginSenha').value;

    if (email && senha) {
        // adicionar lógica adicional para validar o login, se necessário
        window.location.href = '/perfilP/';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}