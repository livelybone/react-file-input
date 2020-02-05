import { DisplayFile, FileType } from './types'
import { blobToBase64 } from 'base64-blob'

export function isImg(file: FileType) {
  const { name, url } = file as any
  const reg = /\.(jpe?g|png|webp|gif|svg)$/
  return (name && reg.test(name)) || (url && reg.test(url))
}

export function convertFiles(files: FileType[]): Promise<DisplayFile[]> {
  return Promise.all(
    files.map(file => {
      if (file instanceof File || file instanceof Blob) {
        return blobToBase64(file).then(url => ({ name: file.name, url, file }))
      }
      return { name: file.name, url: file.url }
    }),
  )
}
