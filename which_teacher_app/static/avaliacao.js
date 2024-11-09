// Seleciona todos os inputs de rádio para as estrelas
const starInputs = document.querySelectorAll('.star-rating input[type="radio"]');
const starLabels = document.querySelectorAll('.star-rating label');

// Função para atualizar a cor das estrelas com base na seleção
function updateStarColors() {
    let foundChecked = false;
    starLabels.forEach((label, index) => {
        const input = starInputs[index];
        if (input.checked) {
            foundChecked = true;
        }
        label.style.color = foundChecked ? '#d4af37' : '#d4c29d'; // Dourado ou cinza
    });
}

// Adiciona o evento de clique para cada estrela
starInputs.forEach((input) => {
    input.addEventListener('change', updateStarColors);
});

// Define o efeito de hover
starLabels.forEach((label) => {
    label.addEventListener('mouseover', () => {
        label.style.color = '#d4af37'; // Dourado ao passar o mouse
    });
    label.addEventListener('mouseout', updateStarColors);
});

// Envio do formulário via JavaScript (sem recarregar a página)
document.getElementById('avaliacao-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio tradicional do formulário

    // Captura os valores do formulário
    const rating = document.querySelector('input[name="rating"]:checked').value; // Valor da estrela selecionada
    const comment = document.getElementById('comentario').value; // Comentário do usuário

    // Enviar os dados para o servidor usando Fetch API (POST)
    fetch("{% url 'avaliar' professor.id %}", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': document.querySelector('[name="csrfmiddlewaretoken"]').value
        },
        body: JSON.stringify({
            rating: rating, // Nota das estrelas
            comment: comment // Comentário escrito
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Avaliação enviada com sucesso!');
        } else {
            alert('Houve um erro ao enviar sua avaliação.');
        }
    })
    .catch(error => {
        alert('Erro de comunicação: ' + error);
    });
});
