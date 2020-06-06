import { Component, ReactNode } from 'react'

declare type CFile =
  | File
  | (Blob & {
      name?: string
    })

interface DisplayFile {
  name?: string
  url: string
  file?: CFile
}

declare type FileType = CFile | string | DisplayFile

interface FileInputProps {
  id: string
  accept?: string
  readonly?: boolean
  tip?: ReactNode

  onChange(file: File | null): void
}

interface FileDisplayProps {
  file: DisplayFile
  uploading: boolean
  readonly: boolean
  uploadingContent: ReactNode

  beforeDelete(): Promise<boolean> | boolean

  onDelete(): void

  onFileClick(): void
}

interface ReactFileInputProps {
  id?: string
  accept?: string
  className?: string
  /**
   * If this prop is provided, it means the component is controlled
   * */
  files?: FileType[]
  multiple?: boolean
  tip?: ReactNode
  readonly?: boolean
  uploading?: boolean
  uploadingContent?: ReactNode

  beforeDelete?(file: DisplayFile): Promise<boolean> | boolean

  onChange?(files: DisplayFile[]): void

  onFileClick?(
    currentFile: DisplayFile,
    index: number,
    allFiles: DisplayFile[],
  ): void
}

declare class FileInput extends Component<
  FileInputProps,
  {
    file?: {
      name: string
      url: string
    }
  }
> {
  state: {}
  inputEl: HTMLInputElement
  labelEl: HTMLLabelElement

  render(): JSX.Element
}

declare class ReactFileInput extends Component<
  ReactFileInputProps,
  {
    files: DisplayFile[]
  }
> {
  id: string
  controlled: boolean
  inputComp: FileInput

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
  CFile,
  DisplayFile,
  FileDisplayProps,
  FileInputProps,
  FileType,
  ReactFileInputProps,
}
