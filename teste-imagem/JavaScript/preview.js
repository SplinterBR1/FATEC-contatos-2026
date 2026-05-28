'use strict'

import { uploadParaCloudinary } from './cloudinay.js'
import { uploadParaFreeImageHost } from './freeimage.js'


function preview ({target}) {
    document.getElementById('preview-image')
            .src = URL.createObjectURL(target.files[0])
   
}
async function enviarFoto() {
        const input = document.getElementById('preview-input')
        const linkPublico = await uploadParaFreeImageHost(input.files[0])
        console.log('Link público da imagem:', linkPublico)
}

document.getElementById('preview-input')
        .addEventListener('change', preview)

document.getElementById('upload-button')
        .addEventListener('click', enviarFoto)
