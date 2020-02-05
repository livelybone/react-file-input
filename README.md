# @livelybone/react-file-input
[![NPM Version](http://img.shields.io/npm/v/@livelybone/react-file-input.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/react-file-input)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/react-file-input.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/react-file-input)
![gzip with dependencies: kb](https://img.shields.io/badge/gzip--with--dependencies-kb-brightgreen.svg "gzip with dependencies: kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

[中文文档](./README-CN.md)

A file input component of React, support multiple inputs

## repository
https://github.com/livelybone/react-file-input.git

## Demo
https://github.com/livelybone/react-file-input#readme

## Run Example
Your can see the usage by run the example of the module, here is the step:

1. Clone the library `git clone https://github.com/livelybone/react-file-input.git`
2. Go to the directory `cd your-module-directory`
3. Install npm dependencies `npm i`(use taobao registry: `npm i --registry=http://registry.npm.taobao.org`)
4. Open service `npm run dev`
5. See the example(usually is `http://127.0.0.1:3000/examples/test.html`) in your browser

## Installation
```bash
npm i -S @livelybone/react-file-input
```

## Global name - The variable the module exported in `umd` bundle
`ReactFileInput`

## Interface
See what method or params you can use in [index.d.ts](./index.d.ts)

## Usage
```js
import ReactFileInput from '@livelybone/react-file-input'

const App = () => {
  const [state, setState] = React.useState({})
  const [files, setFiles] = React.useState([])

  return (
    <div>
      <Comp
        beforeDelete={() => new Promise(res => setTimeout(() => res(true),1000))}
        onChange={(val) => {
          setFiles(val)
          console.log(val)
        }}
        onFileClick={(file, i, files) => console.log(file, i, files)}
        files={files}
        multiple={true}
        accept="image/png"
        tip="upload tips"
      />
    </div>
  )
}
```

Use in html, see what your can use in [CDN: unpkg](https://unpkg.com/@livelybone/react-file-input/lib/umd/)
```html
<-- use what you want -->
<script src="https://unpkg.com/@livelybone/react-file-input/lib/umd/<--module-->.js"></script>
```

## style
For building style, you may need to import the css or scss file:
```js
// scss
import '@livelybone/react-file-input/lib/css/index.scss'

// css
import '@livelybone/react-file-input/lib/css/index.css'
```
Or
```scss
// scss
@import 'node_modules/@livelybone/react-file-input/lib/css/index.scss'

// css
@import 'node_modules/@livelybone/react-file-input/lib/css/index.css'
```

Or, you can build your custom style by copying, editing and importing `node_modules/@livelybone/react-file-input/lib/css/index.scss`

## QA

1. Error `Error: spawn node-sass ENOENT`

> You may need install node-sass globally, `npm i -g node-sass`
