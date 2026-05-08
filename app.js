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
};

    // Criar cartao para cada contato
function criarCard(contato) {
  const cartao = document.createElement("div");
  cartao.classList.add("card");

      //Botao editar contato
  const botaoEditar = document.createElement("button");
  botaoEditar.classList.add("botao-editar");
  botaoEditar.textContent = "Editar";
  botaoEditar.addEventListener("click", () => {
      preencherFormulario(contato);
    });
  
      // Botao remover contato
  const botaoRemover = document.createElement("button");
  botaoRemover.classList.add("botao-remover");
  botaoRemover.textContent = "Remover";
  botaoRemover.addEventListener("click", () => {
    if (confirm(`Excluir * ${contato.nome} * da lista de contatos?`)) {
      removerContato(contato.id);
    }
  });

  const foto = document.createElement("img");
  foto.alt = `Pequeno circulo contendo uma foto do ${contato.nome}`;

  const nome = document.createElement("h3");
  nome.textContent = contato.nome;

  const email = document.createElement("p");
  email.textContent = `Email: ${contato.email}`;

  const telefone = document.createElement("p");
  telefone.textContent = `Telefone: ${contato.telefone}`;

  if (!contato.foto) {
    foto.src = "https://img.freepik.com/psd-gratuitas/ilustracao-3d-de-avatar-ou-perfil-humano_23-2150671122.jpg";
  } else { 
    foto.src = contato.foto;
  }

  cartao.append(foto, nome, email, telefone, botaoEditar, botaoRemover);

  return cartao;
};

    // Gerar a lista
function gerarLista(contatos) {
  lista.textContent = "";

  contatos.forEach(contato => {
    const card = criarCard(contato);
    lista.appendChild(card);
  });
};

    // Preencher formulario para edição
function preencherFormulario(contato) {
  inputId.value = contato.id;
  inputNome.value = contato.nome;
  inputEmail.value = contato.email;
  inputTelefone.value = contato.telefone;
  inputFoto.value = contato.foto;
};

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
};

await carregarContatos();