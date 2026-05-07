import {
  getContatos,
  criarContato,
  atualizarContato,
  deletarContato
} from "./contatos.js";

const lista = document.getElementById("lista-contatos");
const form = document.getElementById("form-contato");
const erroDiv = document.getElementById("erro");

const inputId = document.getElementById("id");
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

    const foto = document.createElement("img");
    const nome = document.createElement("h3");
    const email = document.createElement("p");
    const telefone = document.createElement("p");

    const botao = document.createElement("p")
    botao.innerHTML = `<button onclick="editar('${contato.id}', '${contato.nome}', '${contato.email}', '${contato.telefone}', '${contato.foto}')">Editar</button>`

    foto.src = contato.foto
    foto.alt = "Foto redonda do contato cadastrado"
    nome.textContent = contato.nome
    email.textContent = contato.email
    telefone.textContent = contato.telefone
 
    card.append(foto, nome, email, telefone, botao)
    lista.appendChild(card);
    
  });
}

      // Criar ou atualizar contato 
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const contato = {
    nome: inputNome.value,
    email: inputEmail.value,
    telefone: inputTelefone.value,
    foto: inputFoto.value
  };

  try {
    if (inputId.value) {
      await atualizarContato(inputId.value, contato);
    } else {
      await criarContato(contato);
    }

    form.reset();
    inputId.value = "";
    carregarContatos();

  } catch (erro) {
    mostrarErro(erro.message);
  }
});

window.editar = (id, nome, email, telefone, foto) => {
  inputId.value = id;
  inputNome.value = nome;
  inputEmail.value = email;
  inputTelefone.value = telefone;
  inputFoto.value = foto;
};

      // ERRO
function mostrarErro(mensagem) {
  erroDiv.textContent = mensagem;
  setTimeout(() => erroDiv.textContent = "", 3000);
}


carregarContatos();