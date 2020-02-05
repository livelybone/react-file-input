import React, { Component } from 'react'
import { FileInputProps } from '../utils/types'
import { Add } from './Icons'

export default class FileInput extends Component<
  FileInputProps,
  { file?: { name: string; url: string } }
> {
  state = {}
  inputEl!: HTMLInputElement

  render() {
    const { id, accept, tip, readonly, onChange } = this.props
    return (
      <label
        className={`react-file-input${tip ? ' has-tip' : ''}`}
        htmlFor={id}
      >
        <Add />
        {tip && <span className="react-file-input-tip">{tip}</span>}
        {!readonly && (
          <input
            type="file"
            hidden
            id={id}
            ref={ref => (this.inputEl = ref!)}
            accept={accept}
            onChange={ev => {
              onChange(ev.target.files && ev.target.files[0])
              ev.target.value = ''
            }}
          />
        )}
      </label>
    )
  }
}
