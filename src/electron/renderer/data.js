import { DataPersistence } from './persistence'

export const DataType = {
  SchulteTable: 'SchulteTable'
}

export class DataManager {
  constructor () {
    this.dP = new DataPersistence()
  }

  async saveData (dataType = DataType.SchulteTable, obj = {}) {
    return this.dP.writeData(dataType, Date.now(), obj)
  }

  async getData (dataType = DataType.SchulteTable) {
    let data = await this.dP.readData()
    data = data[dataType]
    let res = []
    let index = 0
    for (const key in data) {
      if (index > 4) break
      res.push(data[key])
      index++
    }
    return res
  }
}
