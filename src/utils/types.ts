import { ReactNode } from 'react'

export type FileType =
  | File
  | (Blob & { name?: string })
  | { name?: string; url: string }

export interface FileInputProps {
  id: string
  accept?: string
  readonly?: boolean
  tip?: ReactNode

  onChange(file: File | null): void
}

export interface DisplayFile {
  name?: string
  url: string
  file?: File | Blob
}

export interface FileDisplayProps {
  file: DisplayFile

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

  beforeDelete?(file: DisplayFile): Promise<boolean> | boolean

  onChange?(files: DisplayFile[]): void

  onFileClick?(
    currentFile: DisplayFile,
    index: number,
    allFiles: DisplayFile[],
  ): void
}
