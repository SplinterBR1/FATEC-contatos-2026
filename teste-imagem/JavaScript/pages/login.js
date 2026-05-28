import { navegarPara, renderizarPagina } from "../app.js"

function verificarLogin(usuario, senha){

    if (usuario.value == 'admin' && senha.value == 'admin'){
     navegarPara('preview')
    }else{
        alert ('Usuário ou senha incorreta!')
    }
}
export  function criarLogin (){
    const formulario = document.createElement('form')

    const usuario = document.createElement('input')
    usuario.className  = 'input'
    usuario.type = 'text'
    usuario.placeholder = 'Digite seu usuário'

    const senha = document.createElement('input')
    senha.className = 'input'
    senha.type = 'password'
    senha.placeholder = 'Digite sua senha'

    const entrar = document.createElement('button')
    entrar.className = 'button'
    entrar.type = 'button'
    entrar.textContent = 'Entar'
    entrar.onclick = () => verificarLogin(usuario, senha)

    formulario.append(usuario, senha, entrar)

    return formulario
}