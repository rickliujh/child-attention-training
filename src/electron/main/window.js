import { BrowserWindow } from 'electron'
import {
  createProtocol
} from 'vue-cli-plugin-electron-builder/lib'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let MainWindow

export const MainWindowManager = {
  createWindow () {
    // Create the browser window.
    MainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      titleBarStyle: 'hidden',
      // frame: false,
      webPreferences: {
        nodeIntegration: true
      }
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      MainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
      if (!process.env.IS_TEST) MainWindow.webContents.openDevTools()
    } else {
      createProtocol('app')
      // Load the index.html when not in development
      MainWindow.loadURL('app://./index.html')
    }

    MainWindow.on('closed', () => {
      MainWindow = null
    })
  },
  getMainWindowInstance () {
    return MainWindow
  },
  maximizeMainWindow () {
    MainWindow.maximize()
  },
  unmaximizeMainWindow () {
    MainWindow.unmaximize()
  },
  toggleMaxmizeMainWindow () {
    if (MainWindow.isMaximized()) {
      this.unmaximizeMainWindow()
    } else {
      this.maximizeMainWindow()
    }
  },
  minimizeMainWindow () {
    MainWindow.minimize()
  },
  closeMainWindow () {
    MainWindow.close()
  }
}

export const WindowManager = {
  getWindows () {
    return BrowserWindow.getAllWindows()
  },
  getFirstWindow () {
    let windows = this.getWindows()
    return windows[0]
  }
}
