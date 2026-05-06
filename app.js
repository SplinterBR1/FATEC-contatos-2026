import {
  getContatos,
  criarContato,
  atualizarContato,
  deletarContato
} from "./contatos.js";

const lista = document.getElementById("lista-contatos");
const form = document.getElementById("form-contato");
const erroDiv = document.getElementById("erro");

const inputNome = document.getElementById("nome");
const inputEmail = document.getElementById("email");
const inputTelefone = document.getElementById("telefone");
const inputFoto = document.getElementById("foto");

// Funções

    // Carregar os contatos ao iniciar
async function carregarContatos() {
  try {
    const contatos = await getContatos();
    gerarLista(contatos);
  } catch (erro) {
    mostrarErro(erro.message);
  }
}

    // Gerar a lista
function gerarLista(contatos) {
  lista.textContent = "";

  contatos.forEach(contato => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${contato.foto}" alt="foto">
      <h3>${contato.nome}</h3>
      <p>${contato.email}</p>
      <p>${contato.telefone}</p>
    `;

    lista.appendChild(card);
  });
}

carregarContatos();