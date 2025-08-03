let saldoAtual = 1000;
let overlay;
let frames = 0;
let quantidadeDeBlocos = 0;
let animationFrameId;
let podeRodar = true;
let rodando = false;
let estaParando = false;
let podeParar = false;
let areaRoleta;
let divRoleta;
let velocidade = 7;
let falsaEsperança = 50;
let numeroAtual;
let ultimoNumero;
let rigged = null;
let blocosAtivos = [];
const game = document.getElementById("game");
criarHud();
function criarHud(){
  criarAreaRoleta();
  criarBotao("botaoPlay", "JOGAR", iniciarRoleta);
  //criarBotao("botaoI", "i", gerarColuna);
}
function criarAreaRoleta(){
  areaRoleta = document.createElement("div");
  areaRoleta.classList.add("areaRoleta");
  game.appendChild(areaRoleta);
  divRoleta = document.createElement("div");
  divRoleta.classList.add("divRoleta");
  areaRoleta.appendChild(divRoleta);
}
function criarNumero(numeroAtual){
 const bloco = document.createElement("div");
 bloco.classList.add("bloco");
 divRoleta.appendChild(bloco);
 bloco.innerText = numeroAtual;
 bloco.dataset.id = Date.now();
 blocosAtivos.push(bloco);
 setarEstiloBloco(bloco);
 bloco.style.transform = "translateY(-40%)";
 bloco.style.opacity = "0";
 setTimeout(() =>{
   bloco.style.transform = "translateY(0))";
   bloco.style.opacity = "1";
 }, 10);
}
function setarEstiloBloco(elemento){
  let index = blocosAtivos.length - 1;
  let linha = Math.floor(index / 3);
  let coluna = index % 3;
  let top = 0;
  let left = coluna * 80;
  elemento.style.zIndex = "4";
  elemento.style.transition = "transform 0.5s, opacity 0.4s";
  elemento.style.top = top + "px";
  elemento.style.left = left + "px";
  elemento.style.paddingLeft = "45px";
  elemento.style.width = "50px";
  elemento.style.height = "100px";
  elemento.style.color = "#111";
  elemento.style.fontWeight = "bold";
  elemento.style.fontSize = "4.5rem";
  elemento.style.position = "absolute";
  elemento.style.display = "flex";
  elemento.style.alignItems = "center";
  elemento.style.justifyContent = "center";
  elemento.style.textAlign = "center";
}
function gerarNumero(estado){
    if (estado === "repetir") {
   numeroAtual = ultimoNumero;
   criarNumero(numeroAtual);
    } else if(estado === "gerar"){
    numeroAtual = Math.floor(Math.random()*9) + 1;
    criarNumero(numeroAtual);
    ultimoNumero = numeroAtual;
    }
 }
function gerarColuna(rigged){
   if (rigged){ 
   for (let i = 0; i < 3; i++) {
     gerarNumero("gerar");
   }
   } else if (!rigged){
     gerarNumero("gerar");
     gerarNumero("repetir");
     gerarNumero("repetir");
   }
 }
function apagarBloco(){
  const blocoParaRemover = blocosAtivos.shift();
  if (blocoParaRemover) {
    blocoParaRemover.style.transition = "transform 0.3s ease-out, opacity 0.3s ease-out";
    blocoParaRemover.style.transform = "translateY(6%)";
    blocoParaRemover.style.opacity = "0";
    setTimeout(() => {
      blocoParaRemover.remove();
    }, 500);
  }
}

function gerenciarResultado(){
   let chance = Math.floor(Math.random() * 100) +1;
   if (chance > falsaEsperança) rigged = false; else rigged = true;
   if (rigged) {
   gerarColuna(true); 
   }else if (!rigged) {
     gerarColuna(false);
 }
}
 function criarColunaAleatoria(){
   if (Math.random() < 0.99) {
        gerarColuna(!rigged);
    } else {
   gerarColuna(rigged);
}
 }
function limparFocusRoleta(){
  overlay.style.opacity = "0";
    setTimeout (() => {
    overlay.remove();
    }, 2000);
}
function focusRoleta() {
  overlay = document.createElement("div");
  overlay.classList.add("overlay");
  game.appendChild(overlay);

  const jegue = document.createElement("div");
  jegue.classList.add("jegue");
  game.appendChild(jegue);
  jegue.style.transform = "translate(-50%, 100%)";

  setTimeout(() => {
    jegue.style.transform = "translate(-50%, 25%)";
    overlay.style.opacity = "1";
  }, 500);

  setTimeout(() => {
    jegue.style.transform = "translate(-50%, 500%)";
  }, 2000);

  setTimeout(() => {
    jegue.remove();
    overlay.style.zIndex = "4";
  }, 5000);
  setTimeout(() => {
  }, 5000);
}
function limparRoleta() {
  return new Promise((resolve, reject) => {
    quantidadeDeBlocos = 0;
    frames = 0;
    estaParando = false;
    podeParar = false;
    podeRodar = true;
    velocidade = 7;
    rigged = null;

    blocosAtivos.forEach((bloco) => {
      bloco.style.transition = "all 0.8s ease";
      bloco.style.opacity = "0";
    });

    setTimeout(() => {
      blocosAtivos.forEach((bloco) => {
        bloco.remove();
      });
      blocosAtivos.length = 0;
      resolve();
      focusRoleta();
    }, 500);
  });
}

function iniciarRoleta() {
  limparRoleta().then(() => {
    if (rodando) return;
    setTimeout(() => {
      requestAnimationFrame(animarRoleta);
      setTimeout(() => {
        estaParando = true;
      }, 5000);
    }, 2000);
  });
}
function animarRoleta(){
  if (!podeRodar) return;
  rodando = true;
  frames ++;
  if (estaParando) velocidade = velocidade - 0.005;
  let posY;
  let novaPosY;
   blocosAtivos.forEach (bloco => {
     posY = parseFloat(bloco.style.top || '0px');
     novaPosY = posY + velocidade;
    bloco.style.top = novaPosY + "px";
   });
   while (blocosAtivos.length > 0 && blocosAtivos[0].offsetTop >= 191) {
  apagarBloco();
}
  let blocosAtivoslength = blocosAtivos.length;
  if (frames > 15 && blocosAtivos.length < 9){
    if (quantidadeDeBlocos <= 56){
    criarColunaAleatoria();
    quantidadeDeBlocos++
} else if (quantidadeDeBlocos === 57){
    criarColunaAleatoria();
    quantidadeDeBlocos++
  } else if (quantidadeDeBlocos === 58){
    gerenciarResultado();
    quantidadeDeBlocos++
  } else if (quantidadeDeBlocos === 59){
    criarColunaAleatoria();
    quantidadeDeBlocos++
    podeParar = true;
  }
  frames = 0;
  }

if (podeParar && blocosAtivos[0].offsetTop < 191 && blocosAtivos[0].offsetTop > 188){
  velocidade = 0;
  rodando = false;
  limparFocusRoleta();
  mostrarResultado(rigged)
  cancelAnimationFrame(animationFrameId);
  return
}
   animationFrameId = requestAnimationFrame(animarRoleta);
}
function criarElementosdoResultado(){
  const divResultado = document.createElement("div");
  divResultado.classList.add("divResultado");
  game.appendChild(divResultado);
  const h1Resultado = document.createElement("h1");
  h1Resultado.classList.add("h1Resultado");
  divResultado.appendChild(h1Resultado);
  const pResultado = document.createElement("p");
  pResultado.classList.add("pResultado");
  divResultado.appendChild(pResultado);
  return { divResultado, h1Resultado, pResultado };
}
function setarResultado(resultado){
  const { divResultado, h1Resultado, pResultado } = criarElementosdoResultado();
  if (resultado === "ganhou"){
    h1Resultado.innerText = "Você ganhou!";
    pResultado.innerText = "+500R$";
    pResultado.style.color = "#097f47";
  } else if (resultado === "perdeu"){
    h1Resultado.innerText = "Você perdeu!";
    document.body.classList.add("shakeTela");
    setTimeout(() => {
      document.body.classList.remove("shakeTela");
    }, 1000);
    pResultado.innerText = "-500R$";
    pResultado.style.color = "#c50f0f";
  }
  animarResultado(divResultado);
}
function animarResultado(div){
  div.style.transform = "translateY(-500%) scale(0.4)";
  setTimeout(() => {
    div.style.transform = "translateY(10%) scale(1.2)";
    setTimeout (() => {
      div.style.transform = "translateY(-500%) scale(0.4)";
      setTimeout(() => {
        div?.remove();
      }, 5000);
    }, 4000);
  }, 500);
  
}
function mostrarResultado(rigged){
  if (rigged) {
    setarResultado("perdeu");
  }else if (!rigged){
    setarResultado("ganhou");
  }
}
function criarBotao(tipo, texto, funcao){
  const botaoDiv = document.createElement("div");
  botaoDiv.classList.add("botaoDiv");
  game.appendChild(botaoDiv);
  const botao = document.createElement("button");
  botao.classList.add("botao");
  botao.innerText = texto;
    botao.addEventListener("click", ()=> {
      funcao();
      botao.style.pointerEvents = "none";
      setTimeout(() => {
        botao.style.pointerEvents = "auto";
      }, 3000);
    });
    if (tipo === "botaoI"){
      botao.classList.add("botaoI");
      game.appendChild(botao);
    } else {
      botaoDiv.appendChild(botao);
    }
}
