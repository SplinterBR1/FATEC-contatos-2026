import { navegarPara, renderizarPagina } from "../app.js";
import { criarPreview } from "./preview.js";


export function corAzul (){
 
  const container = document.createElement('div')
  container.className = 'div-azul'
  

    const buttonVoltar = document.createElement('button')
    buttonVoltar.className = 'button'
    buttonVoltar.id = 'upload-button'
    buttonVoltar.type = 'button'
    buttonVoltar.textContent = 'Voltar'
    buttonVoltar.onclick = () => navegarPara('login')


    container.append(buttonVoltar)
 return container
}
