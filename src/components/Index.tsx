import simpleUniqueId from '@livelybone/simple-unique-id'
import { blobToBase64 } from 'base64-blob'
import React, { Component } from 'react'
import { DisplayFile, ReactFileInputProps } from '../utils/types'
import { convertFiles, isImg } from '../utils/utils'
import FileDisplay from './FileDisplay'
import FileInput from './FileInput'

export default class ReactFileInput extends Component<
  ReactFileInputProps,
  { files: DisplayFile[] }
> {
  id!: string
  controlled = false
  inputComp!: FileInput

  constructor(props: ReactFileInputProps) {
    super(props)
    this.state = {
      files: [],
    }

    this.id = props.id || simpleUniqueId()
    this.controlled = 'files' in props
    if (this.controlled) {
      if (!('onChange' in props) || typeof props.onChange !== 'function') {
        console.error(
          'react-file-input: You provided a `files` prop to the component without an `onChange` handler. This will render a read-only field',
        )
      } else {
        // eslint-disable-next-line no-console
        console.log(
          'react-file-input: The `files` prop is provided, it means the component is controlled, and you must provide `onChange` handler to handle the files change of the component',
        )
      }
    }

    if (props.files) {
      convertFiles(props.files).then(files => {
        this.setState({ files })
      })
    }
  }

  setFiles(files: DisplayFile[]) {
    const { onChange } = this.props
    if (this.controlled) {
      onChange && onChange(files)
    } else {
      this.setState({ files }, () => {
        onChange && onChange(this.state.files)
      })
    }
  }

  fileInput(file: File | null) {
    if (file) {
      ;(!this.controlled && isImg(file)
        ? blobToBase64(file)
        : Promise.resolve('')
      ).then(url => {
        const $file = { file, url, name: file.name }
        if (!this.props.multiple) this.setFiles([$file])
        else {
          this.setFiles(this.state.files.concat($file))
        }
      })
    }
  }

  componentDidUpdate(
    prevProps: Readonly<ReactFileInputProps>,
    prevState: Readonly<{ files: DisplayFile[] }>,
    snapshot?: any,
  ): void {
    if (this.props.files && prevProps.files !== this.props.files) {
      convertFiles(this.props.files).then(files => {
        this.setState({ files })
      })
    }
  }

  render() {
    const {
      beforeDelete,
      onFileClick,
      multiple,
      readonly,
      tip,
      accept,
    } = this.props

    const files = multiple ? this.state.files : this.state.files.slice(0, 1)

    const display = files.map((file, i) => (
      <FileDisplay
        file={file}
        key={i}
        uploading={!!this.props.uploading && i === files.length - 1}
        uploadingContent={this.props.uploadingContent || 'uploading...'}
        onDelete={() =>
          this.setFiles(this.state.files.filter((f, index) => index !== i))
        }
        beforeDelete={() => (beforeDelete ? beforeDelete(file) : true)}
        onFileClick={() => {
          if (onFileClick) {
            onFileClick(file, i, this.state.files)
          }
        }}
      />
    ))

    const input = (
      <FileInput
        id={this.id}
        ref={comp => (this.inputComp = comp!)}
        tip={tip}
        readonly={readonly}
        accept={accept}
        onChange={this.fileInput.bind(this)}
      />
    )

    return multiple ? (
      <div
        className={`react-file-input-wrapper multiple${
          readonly ? ' readonly' : ''
        } ${this.props.className || ''}`}
      >
        {display}
        {(!readonly || this.state.files.length < 1) && input}
      </div>
    ) : (
      <div
        className={`react-file-input-wrapper${
          readonly ? ' readonly' : ''
        } ${this.props.className || ''}`}
      >
        {display}
        {this.state.files.length < 1 && input}
      </div>
    )
  }
}
