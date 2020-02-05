import { Component } from 'react'

declare type FileType =
  | File
  | (Blob & {
      name?: string
    })
  | {
      name?: string
      url: string
    }

interface DisplayFile {
  name?: string
  url: string
  file?: File | Blob
}

interface ReactFileInputProps {
  id?: string
  accept?: string
  files?: FileType[]
  multiple?: boolean

  beforeDelete?(file: DisplayFile): Promise<boolean> | boolean

  onChange?(files: DisplayFile[]): void

  onFileClick?(
    currentFile: DisplayFile,
    index: number,
    allFiles: DisplayFile[],
  ): void
}

declare class ReactFileInput extends Component<
  ReactFileInputProps,
  {
    files: DisplayFile[]
  }
> {
  id: string

  constructor(props: ReactFileInputProps)

  setFiles(files: DisplayFile[]): void

  componentDidUpdate(
    prevProps: Readonly<ReactFileInputProps>,
    prevState: Readonly<{
      files: DisplayFile[]
    }>,
    snapshot?: any,
  ): void

  render(): JSX.Element
}

export default ReactFileInput
