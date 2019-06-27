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

  async getData (dataType = DataType.SchulteTable, callback) {
    let data = await this.dP.readData()
    data = data[dataType]
    return callback(data)
  }

  async getSchultTableLastFive () {
    return this.getData(DataType.SchulteTable, (data) => {
      let res = []
      let keys = Object.keys(data)

      // read last 5 object
      for (let i = 1; i <= 5; i++) {
        res.push(data[keys[keys.length - i]])
      }

      return res
    })
  }

  async getSchultTableToday () {
    return this.getData(DataType.SchulteTable, (data) => {
      let toDayStartTimestamp = new Date().setHours(0, 0, 0, 0)
      let toDayEndTimestamp = new Date().setHours(23, 59, 59, 999)
      let res = []

      for (const key in data) {
        if (parseInt(key) >= toDayStartTimestamp &&
          parseInt(key) <= toDayEndTimestamp) {
          res.push(data[key])
        }
      }

      return res
    })
  }
}
