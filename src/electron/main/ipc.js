import { ipcMain } from 'electron'
import * as events from '../common/events'
import printer from './printer'

ipcMain
  .on(events.EVENT_OPEN_PRINT_PAGE, (_, url) => {
    console.log('main get')
    printer.openPrintPage(url)
  })
  .on(events.EVENT_PRINT_SILENT, (_, data) => {
    printer.printSquare(data)
  })
  .on(events.EVENT_GET_PRINT_LIST, (event) => {
    event.reply(events.EVENT_SEND_PRINT_LIST, printer.getPrinterList())
  })
