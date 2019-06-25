import fs from 'fs'
import path from 'path'
import { remote } from 'electron'

const dataPath = path.join(remote.app.getAppPath(), '/data.json')

export default {
  writeFile: async function (data) {
    let json = JSON.stringify(data, null, 2)
    return new Promise((resolve, reject) => {
      fs.writeFile(dataPath, json, { encoding: 'utf8' }, (err) => {
        if (err) reject(err)
        resolve(true)
      })
    })
  },

  readData: async function () {
    return new Promise((resolve, reject) => {
      fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {
        if (err) reject(err)
        resolve(JSON.parse(data))
      })
    })
  },

  writeData: async function (key, data) {
    return new Promise(async (resolve, reject) => {
      let newData = {}
      if (fs.existsSync(dataPath)) {
        newData = await this.readData()
      }
      newData[key] = data
      this.writeFile(newData)
        .then(val => resolve(val))
        .catch(err => reject(err))
    })
  }
}
