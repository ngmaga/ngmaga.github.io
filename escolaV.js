const form = document.querySelector("#pre-matricula");
const dddInput = document.querySelector("#ddd");
const emailInput = document.querySelector("#email");
const checkboxes = document.querySelectorAll('input[name="atividade-extracurricular"]');

form.addEventListener("submit", submitMessage);

const DDD = [
    61, // Distrito Federal
    62, 64, // Goiás
    65, 66, // Mato Grosso
    67, // Mato Grosso do Sul
    82, // Alagoas
    71, 73, 74, 75, 77, // Bahia
    85, 88, // Ceará
    98, 99, // Maranhão
    83, // Paraíba
    81, 87, // Pernambuco
    86, 89, // Piauí
    84, // Rio Grande do Norte
    79, // Sergipe
    68, // Acre
    96, // Amapá
    92, 97, // Amazonas
    91, 93, 94, // Pará
    69, // Rondônia
    95, // Roraima
    63, // Tocantins
    27, 28, // Espírito Santo
    31, 32, 33, 34, 35, 37, 38, // Minas Gerais
    21, 22, 24, // Rio de Janeiro
    11, 12, 13, 14, 15, 16, 17, 18, 19, // São Paulo
    41, 42, 43, 44, 45, 46, // Paraná
    51, 53, 54, 55, // Rio Grande do Sul
    47, 48, 49 // Santa Catarina
];

function submitMessage(event) {
    if (!verificarForm()) {
        event.preventDefault();
        return;
    }
    alert('Formulário enviado com sucesso!');
}

function verificarForm() {
    if (!verificarDDD()) {
        alert("DDD inválido!");
        return false;
    }
    if(!verificarEmail()) {
        alert("O email deve conter @ e ponto (.)!");
        return false;
    }
    if (!verificarCheckBoxes()) {
        alert("Só aceitamos no máximo 3 atividades extracurriculares!");
        return false;
    }
    return true;
}

function verificarDDD() {
    return DDD.includes(Number(dddInput.value));
}

function verificarEmail() {
    return emailInput.value.includes(".");
}

function verificarCheckBoxes() {
    const ativos = [...checkboxes].filter((input) => input.checked);
    return ativos.length <= 3;
}