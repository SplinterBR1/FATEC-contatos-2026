'use strict'

const API_KEY = '6d207e02198a847aa98d0a2a901485a5'
const FREEIMAGE_UPLOAD_URL = 'https://freeimage.host/api/1/upload'
const CORS_PROXY = 'https://corsproxy.io/?'

export async function uploadParaFreeImageHost(file) {
    const formData = new FormData()
    formData.append('key', API_KEY)
    formData.append('action', 'upload')
    formData.append('format', 'json')
    formData.append('source', file)

    const url = `${CORS_PROXY}${encodeURIComponent(FREEIMAGE_UPLOAD_URL)}`
    const response = await fetch(url, {
        method: 'POST',
        body: formData
    })

    if (!response.ok) {
        throw new Error(`Erro no upload: ${response.status}`)
    }

    const data = await response.json()

    if (!data?.status_code || data.status_code !== 200) {
        throw new Error('Erro no retorno da API')
    }

    return data.image.url
}