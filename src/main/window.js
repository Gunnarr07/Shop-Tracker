'use strict'

/**
 *
 */
export class WindowForm {
    /**
     * Creates a WindowForm object using BrowserWindow objects
     *
     * @constructor
     *
     * @param {object} BrowserWindow
     *   Use BrowserWindow to create windows to display forms and other content
     * @param {list} windows
     *   A list holding BrowserWindow objects
     * @param {} dirname
     *   The directory where html templates are located
     * @param {boolean} debug
     *   Boolean used to turn debugging on or off, shows development tools in BrowserWindows
     * @param {object} errorMessage
     *   Used to handle errors from user input
     */
  constructor (BrowserWindow, errorMessage, debug, dirname, windows) {
    this.BrowserWindow = BrowserWindow
    this.errorMessage = errorMessage
    this.debug = debug
    this.dirname = dirname
    this.windows = windows
  }

  addInventoryWindow () {
    this.windows.push({ window: new this.BrowserWindow({ width: 950, height: 880, resizable: true, maximizable: true }), index: this.windows.length })
    let addInventoryWin = this.windows[this.windows.length - 1].window
    addInventoryWin.loadURL(`file://${this.dirname}/src/renderer/add_inventory/add_inventory.html`)
    if (this.debug) {
      addInventoryWin.webContents.openDevTools()
    }

    addInventoryWin.webContents.on('did-finish-load', () => {
      addInventoryWin.webContents.send('load-data', {
        windowIndex: this.windows.length - 1
      })
    })

    addInventoryWin.on('closed', () => {
      this.windows.splice((this.windows.length - 1), 1)
    })
  }

    /**
     * Create window to add user.
     * Allows the admin/user who program is registered to
     * to add more users.
     *
     * @param {} user
     *   The current user's signed in data
     * @param {} registeration
     *   The registration data
     */
  addUserWindow (user, registeration) {
    if (user.id === registeration.userId) {
      this.windows.push({ window: new this.BrowserWindow({ width: 800, height: 600 }), index: this.windows.length })
      let addUserWin = this.windows[this.windows.length - 1].window
      addUserWin.loadURL(`file://${this.dirname}/src/renderer/add_user/add_user.html`)
      if (this.debug) {
        addUserWin.webContents.openDevTools()
      }
      addUserWin.webContents.on('did-finish-load', () => {
        addUserWin.webContents.send('load-data', {
          windowIndex: this.windows.length - 1,
          errorMessage: this.errorMessage
        })
      })

            // Remove window from array when window is closed
      addUserWin.on('closed', () => {
        this.windows.splice((this.windows.length - 1), 1)
      })
    }
  }

    /**
     * Create change password window.
     * Allows the user to fill out a form changing their password.
     */
  changePasswordWindow () {
    this.windows.push({ window: new this.BrowserWindow({ width: 500, height: 300 }), index: this.windows.length })
    let changePasswordWin = this.windows[this.windows.length - 1].window
    changePasswordWin.loadURL(`file://${this.dirname}/src/renderer/change_password/change_password.html`)

    changePasswordWin.webContents.on('did-finish-load', () => {
      changePasswordWin.webContents.send('load-data', {
        windowIndex: this.windows.length - 1,
        errorMessage: this.errorMessage
      })
    })

        // Remove window from array when window is closed
    changePasswordWin.on('closed', () => {
      this.windows.splice((this.windows.length - 1), 1)
    })
  }

    /**
     *
     */
  editInventoryWindow () {
    this.windows.push({ window: new this.BrowserWindow({ width: 800, height: 700, resizable: false, maximizable: false }), index: this.windows.length })
    let editInventoryWin = this.windows[this.windows.length - 1].window
    editInventoryWin.loadURL(`file://${this.dirname}/src/renderer/edit_inventory/edit_inventory.html`)
    if (this.debug) {
      editInventoryWin.webContents.openDevTools()
    }

    editInventoryWin.webContents.on('did-finish-load', () => {
      editInventoryWin.webContents.send('load-data', {
        windowIndex: this.windows.length - 1
      })
    })

    editInventoryWin.on('closed', () => {
      this.windows.splice((this.windows.length - 1), 1)
    })
  }

    /**
     * Create a login window.
     * Allows the user to fill out a login form and log into the program
     */
  loginWindow () {
    this.windows.push({ window: new this.BrowserWindow({ width: 500, height: 300, resizable: false, maximizable: false, icon: `${this.dirname}/src/images/favicon.ico` }), index: this.windows.length })
    let loginWin = this.windows[this.windows.length - 1].window
    loginWin.loadURL(`file://${this.dirname}/src/renderer/login/login.html`)
    if (this.debug) {
      loginWin.webContents.openDevTools()
    }
    loginWin.webContents.on('did-finish-load', () => {
      loginWin.webContents.send('load-data', {
        windowIndex: this.windows.length - 1,
        errorMessage: this.errorMessage
      })
    })

        // Remove window from array when window is closed
    loginWin.on('closed', () => {
      this.windows.splice((this.windows.length - 1), 1)
    })
  }

    /**
     * Create the main index window.
     * Holds the main inventory allowing user to look up parts stored on database
     *
     * @param {} mainData
     *   Data to be loaded into window when created
     */
  mainWindow (mainData) {
    this.windows.push({ window: new this.BrowserWindow({ width: 1800, height: 1000, icon: `${this.dirname}/src/images/favicon.ico` }), index: this.windows.length })
    let mainWin = this.windows[this.windows.length - 1].window
    mainWin.loadURL(`file://${this.dirname}/src/renderer/index/index.html`)

        // Load data into window after it finishes loading
    mainWin.webContents.on('did-finish-load', () => {
      mainWin.webContents.send('load-data', {
        mainData: mainData,
        windowIndex: this.windows.length - 1,
        errorMessage: this.errorMessage
      })
    })
    if (this.debug) {
      mainWin.webContents.openDevTools()
    }

    // Remove window from array when window is closed
    mainWin.on('closed', () => {
      this.windows.splice((this.windows.length - 1), 1)
    })
  }

  modalPartWindow (modalData) {
    this.windows.push({window: new this.BrowserWindow({width: 600, height: 600, parent: this.windows[modalData.index].window, modal: true, show: false}), index: this.windows.length})
    let modalPartWin = this.windows[this.windows.length - 1].window
    modalPartWin.loadURL(`file://${this.dirname}/src/renderer/index/index_modal.html`)
    modalPartWin.once('ready-to-show', () => {
      modalPartWin.show()
    })
    modalPartWin.webContents.on('did-finish-load', () => {
      modalPartWin.webContents.send('load-data', {
        modalData: modalData,
        windowIndex: this.windows.length - 1
      })
    })
    if (this.debug) {
      modalPartWin.webContents.openDevTools()
    }
    modalPartWin.on('closed', () => {
      this.windows.splice((this.windows.length - 1), 1)
    })
  }

    /**
     *
     */
  myCodisAccessWindow () {
    this.windows.push({ window: new this.BrowserWindow({ width: 1500, height: 800, webPreferences: { 'nodeIntegration': false } }), index: this.windows.length })
    let codisWin = this.windows[this.windows.length - 1].window
    codisWin.loadURL('https://aes.mycodisaccess.com')
    if (this.debug) {
      codisWin.webContents.openDevTools()
    }
  }

  oregonWindow () {
    this.windows.push({ window: new this.BrowserWindow({ width: 1500, height: 800, webPreferences: { 'nodeIntegration': false } }), index: this.windows.length })
    let oregonWin = this.windows[this.windows.length - 1].window
    oregonWin.loadURL('https://www.oregonproducts.com/oep/')
    if (this.debug) {
      oregonWin.webContents.openDevTools()
    }
  }

    /**
     * Create Registration window
     * Window has a form allowing user to register program with their company 1215 895
     * 
     */
  registrationWindow (states) {
    this.windows.push({ window: new this.BrowserWindow({ width: 900, height: 800 }), index: this.windows.length })
    let registrationWin = this.windows[this.windows.length - 1].window
    registrationWin.loadURL(`file://${this.dirname}/src/renderer/registration/register.html`)
    if (this.debug) {
      registrationWin.webContents.openDevTools()
    }

    let times = []
    for (let i = 1; i <= 12; i++) {
      times.push(i + ':00')
      times.push(i + ':30')
    }

        // Load data into window after it finsishes loading
    registrationWin.webContents.on('did-finish-load', () => {
      registrationWin.webContents.send('load-data', {
        windowIndex: (this.windows.length - 1),
        times: times,
        states: states
                // errorMessage: this.errorMessage
      })
    })

        // Remove window from array when window is closed
    registrationWin.on('closed', () => {
      this.windows.splice((this.windows.length - 1), 1)
    })
  }

    /**
     * Create repair invoice window.
     * Used to display a form allowing user to fill out
     * a repair invoice
     *
     * @param {} user
     *   The current user's signed in data
     * @param {} registeration
     *   The registration data
     */
  repairInvoiceWindow (user, registeration) {
    this.windows.push({ window: new this.BrowserWindow({ width: 1500, height: 800 }), index: this.windows.length })
    let repairWin = this.windows[this.windows.length - 1].window
    repairWin.loadURL(`file://${this.dirname}/src/renderer/repair_invoice/repair.html`)

        // Load data into window after it finishes loading
    repairWin.webContents.on('did-finish-load', () => {
      repairWin.webContents.send('load-data', {
        registeration: registeration,
        errorMessage: this.errorMessage
      })
    })
    if (this.debug) {
      repairWin.webContents.openDevTools()
    }

        // Remove window from array when window is closed
    repairWin.on('closed', () => {
      this.windows.splice((this.windows.length - 1), 1)
    })
  }
}

// module.exports = {
//   WindowForm: WindowForm
// }
