import { ReactNode } from 'react'

export type CFile = File | (Blob & { name?: string })

export interface DisplayFile {
  name?: string
  url: string
  file?: CFile
}

export type FileType = CFile | string | DisplayFile

export interface FileInputProps {
  id: string
  accept?: string
  readonly?: boolean
  tip?: ReactNode

  onChange(file: File | null): void
}

export interface FileDisplayProps {
  file: DisplayFile

  uploading: boolean

  uploadingContent: ReactNode

  beforeDelete(): Promise<boolean> | boolean

  onDelete(): void

  onFileClick(): void
}

export interface ReactFileInputProps {
  id?: string
  accept?: string

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
