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

      // Criar cartao para cada contato
function criarCard(contato) {
  const cartao = document.createElement("div");
  cartao.classList.add("card");

  const botaoEdit = document.createElement("button")
  botaoEdit.classList.add("botao-editar")
  botaoEdit.textContent = "Editar"
  
  const botaoRemover = document.createElement("button")
  botaoRemover.classList.add("botao-remover")
  botaoRemover.textContent = "Remover"

  const foto = document.createElement("img");
  const nome = document.createElement("h3");
  const email = document.createElement("p");
  const telefone = document.createElement("p");

  foto.src = contato.foto
  foto.alt = `Pequeno circulo contendo uma foto do ${contato.nome}`
  nome.textContent = contato.nome
  email.textContent = `Email: ${contato.email}`
  telefone.textContent = `Telefone: ${contato.telefone}`

  cartao.append(foto, nome, email, telefone, botaoEdit, botaoRemover)

  return cartao;
}

      // Gerar a lista
function gerarLista(contatos) {
  lista.textContent = "";

  contatos.forEach(contato => {
    const card = criarCard(contato);
    lista.appendChild(card);

        // Eventos Editar e Remover
    const botaoEditar = card.querySelector(".botao-editar");
    botaoEditar.addEventListener("click", (editar) => {
      preencherFormulario(contato);
    });

    const botaoRemover = card.querySelector(".botao-remover");
    botaoRemover.addEventListener("click", (remover) => {
      if (confirm(`Excluir * ${contato.nome} * da lista de contatos?`)) {
        removerContato(contato.id)
      }
    });

  });
}

      // Preencher formulario para edição
function preencherFormulario(contato) {
  inputId.value = contato.id;
  inputNome.value = contato.nome;
  inputEmail.value = contato.email;
  inputTelefone.value = contato.telefone;
  inputFoto.value = contato.foto;
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

      //Deletar contato
async function removerContato(id) {
    try {
      await deletarContato(id);
      carregarContatos();
    } catch (erro) {
      mostrarErro(erro.message);
    }
};


// ERRO
function mostrarErro(mensagem) {
  erroDiv.textContent = mensagem;
  setTimeout(() => erroDiv.textContent = "", 3000);
}


carregarContatos();