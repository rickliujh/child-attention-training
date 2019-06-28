import fs from 'fs'
import path from 'path'
import { remote } from 'electron'

const dataPath = path.join(remote.app.getAppPath(), '/../data.json')

export class DataPersistence {
  async writeFile (data) {
    let json = JSON.stringify(data, null, 2)
    return new Promise((resolve, reject) => {
      fs.writeFile(dataPath, json, { encoding: 'utf8' }, (err) => {
        if (err) reject(err)
        resolve(true)
      })
    })
  }

  async readData () {
    if (!fs.existsSync(dataPath)) return null
    return new Promise((resolve, reject) => {
      fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {
        if (err) reject(err)
        resolve(JSON.parse(data))
      })
    })
  }

  async writeData (dataType, key, data) {
    return new Promise(async (resolve, reject) => {
      let newData = {}

      if (fs.existsSync(dataPath)) { newData = await this.readData() }
      if (newData[dataType] === undefined) { newData[dataType] = {} }

      newData[dataType][key] = data
      this.writeFile(newData)
        .then(val => resolve(val))
        .catch(err => reject(err))
    })
  }
}

export default {
  DataPersistence: DataPersistence
}
