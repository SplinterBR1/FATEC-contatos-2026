import { navegarPara, renderizarPagina } from "../app.js"
import { corAzul } from "./azul.js"

export function criarPreview(){
    const formulario = document.createElement('form')

    const container = document.createElement('div')
    container.className = 'preview-container'

    const inputFile = document.createElement('input')
     inputFile.id = 'preview-input'
    inputFile.className = 'preview-input'
    inputFile.type = 'file'
    inputFile.accept = 'image/*'

    const label = document.createElement('label')
    label.className = 'preview-input'
    label.htmlFor = 'preview-input'

    const image = document.createElement('img')
    image.id = 'preview-image'
    image.className = 'preview-image'
    image.src =  './img/upload-icon.svg'

    const containerButtons = document.createElement('div')
    containerButtons.className = 'button-container'

    const buttonSalvar = document.createElement('button')
    buttonSalvar.className = 'button'
    buttonSalvar.id = 'upload-button'
    buttonSalvar.type = 'button'
    buttonSalvar.textContent = 'Salvar'
    buttonSalvar.onclick = () => navegarPara('azul')

        const buttonCancelar = document.createElement('button')
        buttonCancelar.type = 'button'
        buttonCancelar.className = 'button'
        buttonCancelar.textContent = 'Cancelar'
        buttonCancelar.onclick = () => navegarPara('login')

    container.append(inputFile, label, image)
    containerButtons.append(buttonSalvar, buttonCancelar)
    formulario.append(container, containerButtons)

    return formulario
}