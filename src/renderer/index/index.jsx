// 'use babel'
// const babel = require('babel-core')
// import {transform} from 'babel-core'
// // import * as babel from 'babel-core'
// require('babel-core').transform('code', {presets: ['electron', 'react', 'es2015']})
// babel.transform()
// const React = require('react')
// const ReactDOM = require('react-dom')

// require('babel-register')

import React from 'react'
import ReactDOM from 'react-dom'

window.onload = function () {
  ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('root')
  )
}
