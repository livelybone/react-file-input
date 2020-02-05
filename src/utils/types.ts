export type FileType =
  | File
  | (Blob & { name?: string })
  | { name?: string; url: string }

export interface FileInputProps {
  id: string
  accept?: string

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

  beforeDelete?(file: DisplayFile): Promise<boolean> | boolean

  onChange?(files: DisplayFile[]): void

  onFileClick?(
    currentFile: DisplayFile,
    index: number,
    allFiles: DisplayFile[],
  ): void
}
