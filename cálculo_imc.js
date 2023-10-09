
// Função para calcular o IMC
function calcularIMC() {
    // Obter os valores digitados pelo usuário
    const nome = document.getElementById("nome").value;
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);

    // Verificar se os valores são válidos
    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        alert("Por favor, digite valores válidos para peso e altura.");
        return;
    }

    // Calcular o IMC
    const imc = peso / (altura * altura);

    // Exibir o resultado do IMC com o nome
    alert( "OI," + nome + ", seu IMC é: " + imc.toFixed(2));
}

// Adicionar um evento de clique ao botão de envio do formulário
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function (event) {
    event.preventDefault(); // Impede o envio do formulário
    calcularIMC(); // Chama a função de cálculo do IMC
});

