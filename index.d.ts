import { Component, ReactNode } from 'react'

declare type FileType =
  | File
  | (Blob & {
      name?: string
    })
  | {
      name?: string
      url: string
    }

interface FileInputProps {
  id: string
  accept?: string
  readonly?: boolean
  tip?: ReactNode

  onChange(file: File | null): void
}

interface DisplayFile {
  name?: string
  url: string
  file?: File | Blob
}

interface FileDisplayProps {
  file: DisplayFile

  beforeDelete(): Promise<boolean> | boolean

  onDelete(): void

  onFileClick(): void
}

interface ReactFileInputProps {
  id?: string
  accept?: string
  /**
   * If this prop is provided, it means the component is controlled
   * */
  files?: FileType[]
  multiple?: boolean
  tip?: ReactNode
  readonly?: boolean

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
  controlled: boolean

  constructor(props: ReactFileInputProps)

  setFiles(files: DisplayFile[]): void

  fileInput(file: File | null): void

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
export {
  DisplayFile,
  FileDisplayProps,
  FileInputProps,
  FileType,
  ReactFileInputProps,
}
