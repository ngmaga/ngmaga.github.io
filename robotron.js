let roboAmarelo = "robotron-amarelo.png";
let roboRosa = "robotron-rosa.png";
let roboBranco = "robotron-branco.png";
let roboPreto = "robotron-preto.png";
let roboAzul = "robotron-azul.png";
let roboVermelho = "robotron-vermelho.png"


function trocarcor() {
    document.getElementById("imagemrobo").src= roboAzul;
    let cor = roboAzul;
    roboAzul =  roboRosa;
    roboRosa =  roboVermelho ;
    roboVermelho =  roboPreto;
    roboPreto = roboBranco;
    roboPreto = roboAmarelo;
    roboAmarelo = cor;
  }

  function voltaCor() {
    let volta = trocarcor();
  }

  