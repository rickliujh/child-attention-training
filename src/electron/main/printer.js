import { BrowserWindow } from 'electron'

let winprints = null

function getBrowserWindowInstance () {
  if (winprints) {
    winprints.destroy()
  }
  winprints = new BrowserWindow({
    show: false,
    webPreferences: {
      // devTools: true,
      webSecurity: false,
      nodeIntegration: true
    }
  })
  winprints.webContents.openDevTools()
  return winprints
}

export default {
  openPrintPage (url) {
    console.log(url)
    getBrowserWindowInstance()
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      console.log('dev')
      winprints.loadURL(`file://${__dirname}/../public/test-div-table.html`)
    } else {
      console.log('pro')
      winprints.loadURL('app://./test-div-table.html')
    }
    winprints.webContents.on('did-finish-load', () => {
      this.printCurrentPage()
    })
  },
  printCurrentPage () {
    console.log('print do')
    winprints.webContents.print(
      { silent: false, printBackground: true },
      success => {
        console.log(success)
        // winprints.webContents.close();
      }
    )
  },
  printSquare (data) {
    let exJsStr = `window.document.querySelector(".sudoku-container").innerHTML = \`${data.HTML}\``
    getBrowserWindowInstance()
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      winprints.loadURL(`file://${__dirname}/../public/print.html`)
    } else {
      winprints.loadURL('app://./print.html')
    }
    winprints.webContents.on('did-finish-load', () => {
      winprints.webContents.executeJavaScript(exJsStr)
        .then((result) => {
          if (result) {
            winprints.webContents.print(data.printOptions,
              success => {
                console.log(success)
                setTimeout(() => {
                  winprints.destroy()
                }, 30000)
                // winprints.webContents.close();
              })
          }
        })
    })
  },
  getPrinterList () {
    let windows = BrowserWindow.getAllWindows()
    let list = windows[0].webContents.getPrinters()
    return list
  }
}
