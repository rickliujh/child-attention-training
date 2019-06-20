import { WindowManager } from './window'

let winprints = null

function getBrowserWindowInstance () {
  if (winprints) {
    winprints.destroy()
  }
  winprints = WindowManager.createHideWindow()
  // winprints.webContents.openDevTools()
  return winprints
}

export default {
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
    let list = WindowManager
      .getFirstWindow()
      .webContents
      .getPrinters()
    return list
  }
}
