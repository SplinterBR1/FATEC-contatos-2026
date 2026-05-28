'use strict'
import { criarPreview } from "./pages/preview.js"
import { criarLogin } from "./pages/login.js"
import { corAzul } from "./pages/azul.js"

const paginas = {
    preview: {
        titulo: 'PREVIEW DE IMAGEM',
        renderizar: criarPreview
    },
    home: {
        titulo: 'HOME',
        renderizar: criarPreview
    },
    login: {
        titulo: 'LOGIN',
        renderizar: criarLogin
    },
    azul: {
        titulo: 'AZUL',
        renderizar: corAzul
    }
}

export function navegarPara(pagina) {
    window.location.hash = pagina
}

export function renderizarPagina() {
    const nomePagina = window.location.hash.replace('#', '')
    const pagina = paginas[nomePagina]
    
    const formulario = pagina.renderizar()
    document.getElementById('titulo').textContent = pagina.titulo
    document.getElementById('app-main').replaceChildren(formulario)

}

window.addEventListener('hashchange', renderizarPagina)

navegarPara('login')
