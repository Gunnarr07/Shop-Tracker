'use strict'
require('babel-core')
// import {transform} from 'babel-core'
// import * as babel from 'babel-core'
// require('babel-core').transform('code', {presets: 'electron'})
// require('babel-core').transform('code', {presets: ['electron', 'react', 'es2015']})
// require('babel-register')
import {app, BrowserWindow} from 'electron'
// import BrowserWindow from 'browser-window'

// const {app, BrowserWindow, ipcMain} = require('electron')
// const babel = require('babel-core')
// import {transform} from 'babel-core'
// import * as babel from 'babel-core'
// require('babel-core').transform('src/renderer/index/index')
// babel.transform()

let windows = []

function createWindow () {
  windows.push(new BrowserWindow())
  let win = windows[windows.length - 1]
  win.loadURL(`file://${__dirname}/public/index.html`)
  win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
  if (windows.length === 0) {
    createWindow()
  }
})

app.on('browser-window-created', (event, window) => {
  window.setMenu(null)
})
