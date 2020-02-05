import React, { Component } from 'react'
import { DisplayFile, ReactFileInputProps } from '../utils/types'
import FileInput from './FileInput'
import simpleUniqueId from '@livelybone/simple-unique-id'
import FileDisplay from './FileDisplay'
import { blobToBase64 } from 'base64-blob'
import { convertFiles } from '../utils/utils'

export default class ReactFileInput extends Component<
  ReactFileInputProps,
  { files: DisplayFile[] }
> {
  id!: string

  constructor(props: ReactFileInputProps) {
    super(props)
    this.state = {
      files: [],
    }
    this.id = props.id || simpleUniqueId()
  }

  setFiles(files: DisplayFile[]) {
    const { onChange } = this.props
    this.setState({ files }, () => {
      onChange && onChange(this.state.files)
    })
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
    const { beforeDelete, onFileClick, multiple, tip } = this.props

    return multiple ? (
      <div className="react-file-input-wrapper multiple">
        {this.state.files.map((file, i) => (
          <FileDisplay
            file={file}
            key={i}
            onDelete={() =>
              this.setFiles(this.state.files.filter((f, index) => index !== i))
            }
            beforeDelete={() => (beforeDelete ? beforeDelete(file) : true)}
            onFileClick={() =>
              onFileClick && onFileClick(file, i, this.state.files)
            }
          />
        ))}
        <FileInput
          id={this.id}
          tip={tip}
          onChange={file => {
            if (file) {
              blobToBase64(file).then(url => {
                this.setFiles(
                  this.state.files.concat([{ file, url, name: file.name }]),
                )
              })
            }
          }}
        />
      </div>
    ) : (
      <div className="react-file-input-wrapper">
        {this.state.files[0] ? (
          <FileDisplay
            file={this.state.files[0]}
            onDelete={() => this.setFiles([])}
            beforeDelete={() =>
              beforeDelete ? beforeDelete(this.state.files[0]) : true
            }
            onFileClick={() =>
              onFileClick &&
              onFileClick(this.state.files[0], 0, this.state.files)
            }
          />
        ) : (
          <FileInput
            id={this.id}
            tip={tip}
            onChange={file => {
              if (file) {
                blobToBase64(file).then(url => {
                  this.setFiles([{ file, url, name: file.name }])
                })
              }
            }}
          />
        )}
      </div>
    )
  }
}
