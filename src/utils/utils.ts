import { DisplayFile, FileType } from './types'
import { blobToBase64 } from 'base64-blob'

export function isImg(file: FileType) {
  const { name, url } = file as any
  const reg = /\.(jpe?g|png|webp|gif|svg)$/
  return (name && reg.test(name)) || (url && reg.test(url))
}

function isFile(file: any): file is File | (Blob & { name?: string }) {
  return file instanceof File || file instanceof Blob
}

export function convertFiles(files: FileType[]): Promise<DisplayFile[]> {
  return Promise.all(
    files.map(file => {
      if (typeof file === 'string') {
        const name = file
          .split('?')[0]
          .split(/\/+/)
          .pop()
        return { name, url: file }
      }

      const $file = ('file' in file && file.file) || file
      const name = $file.name || file.name
      const url = 'url' in file ? file.url : ''
      if (isFile($file)) {
        return blobToBase64($file).then($url => ({
          name,
          url: $url,
          file: $file,
        }))
      }

      return { name, url }
    }),
  )
}
