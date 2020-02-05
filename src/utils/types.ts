import { ReactNode } from 'react'

export type FileType =
  | File
  | (Blob & { name?: string })
  | { name?: string; url: string }

export interface FileInputProps {
  id: string
  accept?: string
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
  files?: FileType[]
  multiple?: boolean
  tip?: ReactNode

  beforeDelete?(file: DisplayFile): Promise<boolean> | boolean

  onChange?(files: DisplayFile[]): void

  onFileClick?(
    currentFile: DisplayFile,
    index: number,
    allFiles: DisplayFile[],
  ): void
}
