let blocosAtivos = [];
const game = document.getElementById("game");
const roleta = {
  frames: 0,
  quantidadeDeBlocos: 0,
  animationFrameId: null,
  podeRodar: true,
  rodando: false,
  estaParando: false,
  podeParar: false,
  areaRoleta: null,
  divRoleta: null,
  velocidade: 7,
  falsaEsperança: 50,
  numeroAtual: null,
  ultimoNumero: null,
  rigged: null,
  overlay: null,
};
const gerenciadorDeSaldo = {
  saldoAtual: 1000,
  valorApostado: null,
  areaAposta: null,
  areaSaldo: null,
  pAreaAposta: null,
  atualizarSaldo(novoValor, a) {
    this.saldoAtual = novoValor;
    a.innerText = "SALDO = " + this.saldoAtual;
  }
};

// funcões relacionadas a criação do hud
criarHud();
function criarHud(){
	criarLogo();
  criarAreaRoleta();
  criarAreaSaldo();
  criarBotao("botaoPlay", "JOGAR", gerenciarAreaAposta);
  criarBotao("botaoI","", criarAreaInformacao);
}
function criarAreaRoleta(){
  roleta.areaRoleta = document.createElement("div");
  roleta.areaRoleta.classList.add("areaRoleta");
  game.appendChild(roleta.areaRoleta);
  roleta.divRoleta = document.createElement("div");
  roleta.divRoleta.classList.add("divRoleta");
  roleta.areaRoleta.appendChild(roleta.divRoleta);
}
function criarAreaSaldo(){
  gerenciadorDeSaldo.areaSaldo = document.createElement("div");
  gerenciadorDeSaldo.areaSaldo.classList.add("areaSaldo");
  game.appendChild(gerenciadorDeSaldo.areaSaldo);
  animarSurgir(gerenciadorDeSaldo.areaSaldo);
  gerenciadorDeSaldo.atualizarSaldo(gerenciadorDeSaldo.saldoAtual, gerenciadorDeSaldo.areaSaldo);
}
function criarLogo(){
	const logo = document.createElement("div");
	logo.classList.add("logo");
	game.appendChild(logo);
}

// funcões relacionadas a criação da area de informações 
function criarAreaInformacao() {
  const divInfo = document.createElement("div");
  divInfo.classList.add("divInfo");
  game.appendChild(divInfo);
  animarSurgir(divInfo);
  criarTextoInfo(divInfo);
  if (document.querySelector(".divInfo")) {
  	divInfo.addEventListener("click", () => {
  	divInfo.innerHTML = "";
  	divInfo?.remove();
  });
  }
}
function criarTextoInfo(divInfo) {
  const tInfo = document.createElement("p");
  tInfo.classList.add("tInfo");
  tInfo.innerText = `Este projeto foi desenvolvido com o objetivo de conscientizar sobre como é fácil manipular resultados em jogos de aposta online. É importante entender que, apesar da aparência realista, aqui não há nenhuma operação financeira verdadeira: o "saldo" utilizado é apenas uma variável virtual, sem conexão com dinheiro real ou backend.

As imagens usadas foram geradas por inteligência artificial (ChatGPT) e não representam marcas ou serviços reais.

Este site não incentiva ou promove jogos de azar, cassinos ou casas de apostas. O intuito é alertar e educar sobre os riscos e as práticas obscuras que podem existir nesses ambientes.

Qualquer semelhança com sistemas de apostas reais é apenas para fins educacionais e não configura um convite ao jogo ou atividade comercial.`;
  divInfo.appendChild(tInfo);
}

// funcões relacionadas ao gerenciamento do valor da aposta
function gerenciarAreaAposta(){
  gerenciadorDeSaldo.areaAposta = document.createElement("div");
  gerenciadorDeSaldo.areaAposta.classList.add("areaAposta");
  game.appendChild(gerenciadorDeSaldo.areaAposta);
  gerenciadorDeSaldo.pAreaAposta = document.createElement("p");
  gerenciadorDeSaldo.pAreaAposta.classList.add("pAreaAposta");
  gerenciadorDeSaldo.areaAposta.appendChild(gerenciadorDeSaldo.pAreaAposta);
  animarEntradadaAreaAposta(gerenciadorDeSaldo.areaAposta);
  setTimeout(() => {
    gerenciadorDeSaldo.atualizarSaldo(1000, gerenciadorDeSaldo.pAreaAposta);
    criarBotoesDeAposta(gerenciadorDeSaldo.areaAposta);
  }, 2500);
}
function animarEntradadaAreaAposta(a){
  a.classList.add("minimizado");
  setTimeout(() => {
    a.classList.remove("minimizado");
  }, 1900);
  a.style.transform = "translateY(1000%)";
  setTimeout(() => {
  a.style.transform = "translateY(-20%)";
  setTimeout(() => {
    a.style.transform = "translateY(0%)";
  }, 1400);
  }, 1150);
}
function animarSaidadaAreaAposta(a){
  a.style.transform = "translateY(0%)";
  setTimeout(() => {
  a.style.transform = "translateY(-20%)";
  a.classList.add("minimizado");
  setTimeout(() => {
    a.style.transform = "translateY(1000%)";
    setTimeout(() =>{
    a.remove();
    }, 1100);
  }, 1000);
    a.innerHTML = "";
  }, 950);
}
function criarBotaoDeAposta(valor, a){
  const botaoAposta = document.createElement("button");
  botaoAposta.classList.add("botaoAposta");
  a.appendChild(botaoAposta);
  botaoAposta.innerText = valor;
  animarSurgir(botaoAposta);
  botaoAposta.addEventListener("click", () => {
    let novoValor = gerenciadorDeSaldo.saldoAtual - valor;
    gerenciadorDeSaldo.valorApostado = valor;
    gerenciadorDeSaldo.atualizarSaldo(novoValor, gerenciadorDeSaldo.pAreaAposta);
    animarSaidadaAreaAposta(gerenciadorDeSaldo.areaAposta);
    iniciarRoleta();
    document.querySelectorAll(".botaoAposta").forEach((ele) => {
  ele.style.pointerEvents = "none";
});
  });
}
function criarBotoesDeAposta(a){
  criarBotaoDeAposta(50, a);
  criarBotaoDeAposta(100, a);
  criarBotaoDeAposta(250, a);
  criarBotaoDeAposta(500, a);
}

// funcões relacionadas a criação de numeros
function criarNumero(numeroAtual){
  const bloco = document.createElement("div");
  bloco.classList.add("bloco");
  roleta.divRoleta.appendChild(bloco);
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
    roleta.numeroAtual = roleta.ultimoNumero;
    criarNumero(roleta.numeroAtual);
  } else if(estado === "gerar"){
    roleta.numeroAtual = Math.floor(Math.random()*9) + 1;
    criarNumero(roleta.numeroAtual);
    roleta.ultimoNumero = roleta.numeroAtual;
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
  if (chance > roleta.falsaEsperança) roleta.rigged = false; else roleta.rigged = true;
  if (roleta.rigged) {
    gerarColuna(true); 
  } else if (!roleta.rigged) {
    gerarColuna(false);
  }
}
function criarColunaAleatoria(){
  if (Math.random() < 0.99) {
    gerarColuna(!roleta.rigged);
  } else {
    gerarColuna(roleta.rigged);
  }
}

// funcões relacionadas a inicialização da roleta
function limparFocusRoleta(){
  roleta.overlay.style.opacity = "0";
  setTimeout (() => {
    roleta.overlay.remove();
  }, 2000);
}
function focusRoleta() {
  roleta.overlay = document.createElement("div");
  roleta.overlay.classList.add("overlay");
  game.appendChild(roleta.overlay);

  const jegue = document.createElement("div");
  jegue.classList.add("jegue");
  game.appendChild(jegue);
  jegue.style.transform = "translate(-50%, 100%)";

  setTimeout(() => {
    jegue.style.transform = "translate(-50%, 25%)";
    roleta.overlay.style.opacity = "1";
  }, 500);

  setTimeout(() => {
    jegue.style.transform = "translate(-50%, 500%)";
  }, 2000);

  setTimeout(() => {
    jegue.remove();
    roleta.overlay.style.zIndex = "4";
  }, 5000);
  setTimeout(() => {
  }, 5000);
}
function limparRoleta() {
  return new Promise((resolve, reject) => {
    roleta.quantidadeDeBlocos = 0;
    roleta.frames = 0;
    roleta.estaParando = false;
    roleta.podeParar = false;
    roleta.podeRodar = true;
    roleta.velocidade = 7;
    roleta.rigged = null;

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
    if (roleta.rodando) return;
    setTimeout(() => {
      requestAnimationFrame(animarRoleta);
      setTimeout(() => {
        roleta.estaParando = true;
      }, 3000);
    }, 1000);
  });
}
function animarRoleta(){
  const NUMERO_DE_FRAMES = 15;
  const LIMITE_DA_BORDA = 191;
  const LIMITE_DE_BLOCOS = 9;
  if (!roleta.podeRodar) return;
  roleta.rodando = true;
  roleta.frames ++;
  if (roleta.estaParando) roleta.velocidade = roleta.velocidade - 0.005;
  let posY;
  let novaPosY;
  blocosAtivos.forEach (bloco => {
    posY = parseFloat(bloco.style.top || '0px');
    novaPosY = posY + roleta.velocidade;
    bloco.style.top = novaPosY + "px";
  });
  while (blocosAtivos.length > 0 && blocosAtivos[0].offsetTop >= LIMITE_DA_BORDA) {
    apagarBloco();
  }
  let blocosAtivoslength = blocosAtivos.length;
  if (roleta.frames > NUMERO_DE_FRAMES && blocosAtivos.length < LIMITE_DE_BLOCOS){
    if (roleta.quantidadeDeBlocos <= 56){
      criarColunaAleatoria();
      roleta.quantidadeDeBlocos++
    } else if (roleta.quantidadeDeBlocos === 57){
      criarColunaAleatoria();
      roleta.quantidadeDeBlocos++
    } else if (roleta.quantidadeDeBlocos === 58){
      gerenciarResultado();
      roleta.quantidadeDeBlocos++
    } else if (roleta.quantidadeDeBlocos === 59){
      criarColunaAleatoria();
      roleta.quantidadeDeBlocos++
      roleta.podeParar = true;
    }
    roleta.frames = 0;
  }

  if (roleta.podeParar && blocosAtivos[0].offsetTop < LIMITE_DA_BORDA && blocosAtivos[0].offsetTop > 188){
    roleta.velocidade = 0;
    roleta.rodando = false;
    limparFocusRoleta();
    mostrarResultado(roleta.rigged)
    cancelAnimationFrame(roleta.animationFrameId);
    return
  }
  roleta.animationFrameId = requestAnimationFrame(animarRoleta);
}

// funcões relacionadas ao resultado
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

// funcões relacionadas a criação de botões
function criarBotao(tipo, texto, funcao) {
  const botao = document.createElement("button");
  botao.classList.add("botao");

  if (tipo === "botaoI") {
    botao.classList.add("botaoI");
    const Iicon = document.createElement("i");
    Iicon.classList.add("fa-solid", "fa-circle-info");
    botao.appendChild(Iicon);
    game.appendChild(botao);
  } else {
    botao.innerText = texto;
    const botaoDiv = document.createElement("div");
    botaoDiv.classList.add("botaoDiv");
    botaoDiv.appendChild(botao);
    game.appendChild(botaoDiv);
    animarSurgir(botaoDiv);
  }

  botao.addEventListener("click", () => {
    funcao();
    botao.style.pointerEvents = "none";
    setTimeout(() => {
      botao.style.pointerEvents = "auto";
    }, 2000);
  });
}

// funcao relacionada a animação
function animarSurgir(elemento){
	elemento.classList.add("surgir");
  setTimeout (() => {
  elemento.classList.remove("surgir");
  }, 1500);
}
