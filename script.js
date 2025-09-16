document.addEventListener("DOMContentLoaded", function () {
let numeroSecreto;
let tentativasRestantes;
const maxTentativas = 10;
let palpites = []; 

function iniciarJogo() {
  numeroSecreto = Math.floor(Math.random() * 100) + 1;
  tentativasRestantes = maxTentativas;
  palpites = [];
  mostrarMensagem("", "");
  document.getElementById("tentativas").textContent = tentativasRestantes;
  document.getElementById("historico").textContent = "Histórico: nenhum palpite ainda";
  const input = document.getElementById("palpite");
  input.value = "";
  input.disabled = false;
  input.focus();
  document.getElementById("Chutar").disabled = false;
}

function mostrarMensagem(texto, classe) {
  const el = document.getElementById("mensagem");
  el.textContent = texto;
  el.className = "";
  if (classe) el.classList.add(classe);
}

function atualizarHistorico() {
  const el = document.getElementById("historico");
  if (palpites.length === 0) {
    el.textContent = "Histórico: nenhum palpite ainda";
  } else {
    el.textContent = "Histórico: " + palpites.join(", ");
  }
}

function verificarPalpite() {
  const input = document.getElementById("palpite");
  const palpite = parseInt(input.value, 10);

  if (isNaN(palpite) || palpite < 1 || palpite > 100) {
    mostrarMensagem("Digite um número válido entre 1 e 100!", "error");
    return;
  }

  palpites.push(palpite);
  atualizarHistorico();

  tentativasRestantes--;
  document.getElementById("tentativas").textContent = tentativasRestantes;

  if (palpite === numeroSecreto) {
    mostrarMensagem(`Você acertou! O número era ${numeroSecreto}`, "success");
    fimDeJogo();
  } else if (tentativasRestantes === 0) {
    mostrarMensagem(`Você perdeu! O número secreto era ${numeroSecreto}`, "error");
    fimDeJogo();
  } else if (palpite < numeroSecreto) {
    mostrarMensagem("Dica: o número secreto é MAIOR!", "hint-maior");
  } else {
    mostrarMensagem("Dica: o número secreto é MENOR!", "hint-menor");
  }

  input.value = "";
  input.focus();
}

function fimDeJogo() {
  document.getElementById("palpite").disabled = true;
  document.getElementById("Chutar").disabled = true;
}

function reiniciarJogo() {
  iniciarJogo();
}

document.getElementById("Chutar").addEventListener("click", verificarPalpite);
document.getElementById("Reiniciar").addEventListener("click", reiniciarJogo);
document.getElementById("palpite").addEventListener("keydown", function(e) {
  if (e.key === "Enter") verificarPalpite();
});

// INICIO DE JOGO
iniciarJogo();
});
