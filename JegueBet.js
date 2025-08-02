let saldoAtual;
let tic = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3");
let frames = 0;
let animationFrameId;
let podeRodar = true;
let rodando = false;
let areaRoleta;
let divRoleta;
let velocidade = 4;
let falsaEsperança = 50;
let numeroAtual;
let ultimoNumero;
let rigged = null;
let blocosAtivos = [];
const game = document.getElementById("game");
criarHud();
function criarHud(){
  criarAreaRoleta();
  criarBotao("botaoPlay", "jogar", iniciarRoleta);
  criarBotao("botaoI", "i", gerarColuna);
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
}
function setarEstiloBloco(elemento){
  let index = blocosAtivos.length - 1;
  let linha = Math.floor(index / 3);
  let coluna = index % 3;
  let top = 0;
  let left = coluna * 80;
  elemento.zIndex = "4";
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
tic.play();
  blocoParaRemover.remove();
}
}
function gerenciarResultado(){
   let chance = Math.floor(Math.random() * 100) +1;
   if (chance > 50){
     gerarColuna(rigged);
   } else {
     gerarColuna(!rigged);
     
   }
 }
function iniciarRoleta(){
  if (!rodando) requestAnimationFrame(animarRoleta);
}
function animarRoleta(){
  if (!podeRodar) return;
  rodando = true;
  frames ++;
  let posY;
  let novaPosY;
   blocosAtivos.forEach (bloco => {
     posY = parseFloat(bloco.style.top || '0px');
     novaPosY = posY + velocidade;
    bloco.style.top = novaPosY + "px";
   });
   if (blocosAtivos.length > 0 && blocosAtivos[0].offsetTop >= 191){
       apagarBloco();
     }
  let blocosAtivoslength = blocosAtivos.length;
  if (frames > 20 && blocosAtivos.length < 9){
      if (Math.random() < 0.90) {
        gerarColuna(!rigged);
    } else {
   gerarColuna(rigged);
}
frames = 0;
    }
   animationFrameId = requestAnimationFrame(animarRoleta);
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
    });
    if (tipo === "botaoI"){
      botao.classList.add("botaoI");
      game.appendChild(botao);
    } else {
      botaoDiv.appendChild(botao);
    }
}
