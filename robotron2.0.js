
const buttons = document.querySelectorAll(".controle-ajuste");
const btnPreviousRobotron = document.querySelector("#previous");
const btnNextRobotron = document.querySelector("#next");
const robotronDiv = document.querySelector("#robotron-container");

const robotStats = {
  "robotron-azul": { forca: 1000, poder: 560, energia: 675, velocidade: 200 },
  "robotron-vermelho": { forca: 800, poder: 600, energia: 700, velocidade: 180 },
  "robotron-rosa": { forca: 600, poder: 500, energia: 800, velocidade: 220 },
  "robotron-amarelo": { forca: 900, poder: 700, energia: 600, velocidade: 190 },
  "robotron-branco": { forca: 1200, poder: 700, energia: 750, velocidade: 220 },
  "robotron-preto": { forca: 1100, poder: 750, energia: 700, velocidade: 230 },
};

btnPreviousRobotron.addEventListener("click", () => {
    const robotronIMG = robotronDiv.querySelectorAll(".robo");
    robotronDiv.insertBefore(robotronIMG[robotronIMG.length - 1], robotronIMG[0]);
    atualizarEstatisticas();
});

btnNextRobotron.addEventListener("click", () => {
    const robotronIMG = robotronDiv.querySelectorAll(".robo");
    robotronDiv.appendChild(robotronIMG[0]);
    atualizarEstatisticas();
});

buttons.forEach(botao => {
    botao.addEventListener("click", () => mudarValor(botao));
});

function mudarValor(botao) {
    const input = botao.parentNode.querySelector("input");

    if (botao.innerText === "+") {
        if (input.value === "10") return;
        const valor = Number(input.value) + 1;
        input.value = valor !== 10 ? "0"+valor : valor;
    }
    else if (botao.innerText === "-") {
        if (input.value === "00") return;
        const valor = Number(input.value) - 1;
        input.value = "0"+valor;
    }

    atualizarEstatisticas();
}

function atualizarEstatisticas() {
    const selectedRobot = document.querySelector(".robo:not([style*='display: none'])");
    const robotColor = selectedRobot.getAttribute("id");
    const stats = robotStats[robotColor];

    document.querySelector(".estatistica-numero").textContent = stats.forca;
    document.querySelectorAll(".estatistica")[1].querySelector(".estatistica-numero").textContent = stats.poder;
    document.querySelectorAll(".estatistica")[2].querySelector(".estatistica-numero").textContent = stats.energia;
    document.querySelectorAll(".estatistica")[3].querySelector(".estatistica-numero").textContent = stats.velocidade;

}

document.querySelector("#producao").addEventListener("click", (event) => {
    event.preventDefault(); // Impede que o formulário seja submetido (recarregando a página)
    
    // Limpar campos
    document.querySelector("#braco").value = "00";
    document.querySelector("#pernas").value = "00";
    document.querySelector("#nucleos").value = "00";
    document.querySelector("#foguetes").value = "00";
    document.querySelector("#blindagem").value = "00";
    
    // Retorna à imagem inicial do robô
    const robotronIMG = robotronDiv.querySelectorAll(".robo");
    robotronDiv.appendChild(robotronIMG[0]);
    
    // Atualizar estatísticas
    atualizarEstatisticas();
});
