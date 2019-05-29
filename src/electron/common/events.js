// 由`ipc-renderer`发出 打开打印页面
export const EVENT_OPEN_PRINT_PAGE = 'open.print.page'

// 由`ipc-renderer`发出 打印当前页面
export const EVENT_PRINT_SILENT = 'print.current.silent'

// 由`ipc-renderer`发出 获取系统打印机列表
export const EVENT_GET_PRINT_LIST = 'get.print.list'

// 由`ipc-main`发出 返回打印机列表数据
export const EVENT_SEND_PRINT_LIST = 'send.print.list'
