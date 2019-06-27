import DP from './persistence'

export class DataManager {
  constructor () {
    this.dP = DP
  }

  async saveData (obj = {}) {
    return this.dP.writeData(Date.now, obj)
  }

  async readData () {
    let data = await this.dP.readData()
    for (const key in data) {
      return data[key]
    }
  }
}
