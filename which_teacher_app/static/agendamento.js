document.addEventListener("DOMContentLoaded", function() {
    // Obter a data atual no formato YYYY-MM-DD
    const hoje = new Date().toISOString().split("T")[0];
    
    // Definir o atributo min do campo de data para a data de hoje
    document.getElementById("data-selecionada").setAttribute("min", hoje);
});