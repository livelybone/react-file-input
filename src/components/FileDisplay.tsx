import React, { Component } from 'react'
import { FileDisplayProps } from '../utils/types'
import { isImg } from '../utils/utils'
import { Delete, FileImg } from './Icons'

export default class FileDisplay extends Component<FileDisplayProps> {
  render() {
    const { file, beforeDelete, onDelete, onFileClick } = this.props
    return (
      <div className="react-file-input react-file-display" title={file.name}>
        {isImg(file) ? (
          <img
            className="react-file-img"
            src={file.url}
            alt={file.name}
            onClick={onFileClick}
          />
        ) : (
          <FileImg onClick={onFileClick} />
        )}
        <span className="react-file-info-wrapper">
          <span
            className="react-file-del-icon"
            onClick={() => {
              Promise.resolve(beforeDelete()).then(
                should => should && onDelete(),
              )
            }}
          >
            <Delete />
          </span>
          {file.name && <span className="react-file-name">{file.name}</span>}
        </span>
      </div>
    )
  }
}
