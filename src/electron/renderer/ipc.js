import { ipcRenderer } from 'electron'
import * as events from '../common/events'

export function sendOpenPrintPageEvent (url) {
  ipcRenderer.send(events.EVENT_OPEN_PRINT_PAGE, url)
}

export function sendPrintEvent (data) {
  ipcRenderer.send(events.EVENT_PRINT_SILENT, data)
}

export const getPrinterList = async () => {
  return new Promise(resolve => {
    ipcRenderer.send(events.EVENT_GET_PRINT_LIST)
    ipcRenderer.once(events.EVENT_SEND_PRINT_LIST, (_, printerList) => {
      resolve(printerList)
    })
  })
}

export const getPackageInfo = () => {
  return require('../../../package.json')
}
