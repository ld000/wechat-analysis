import fs from 'fs'
import path from 'path'
import utils from './utils.js'
import moment from 'moment'

const init = () => {
  let str = 'var msgNumData = $msgNumData\n'
  str += 'var timeData = $timeData\n'
  str += 'var atCountData = $atCountData\n'

  fs.writeFileSync(path.join(__dirname, '../pages/data.js'), str, 'utf8')
}

const genMsgNumData = (result) => {
  let pieData = {
    values: [],
    labels: [],
    type: 'pie'
  }

  for (let key in result) {
    pieData.values.push(result[key].length)
    pieData.labels.push(key)
  }

  utils.replaceData(path.join(__dirname, '../pages/data.js'), '$msgNumData', JSON.stringify([pieData]))
}

const genTimeData = (result) => {
  let list = []

  for (let key in result) {
    let obj = {
      x: ['0-2', '2-4', '4-6', '6-8', '8-10', '10-12', '12-14', '14-16', '16-18', '18-20', '20-22', '22-24'],
      y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      name: key,
      type: 'bar'
    }

    result[key].map(e => {
      let hour = moment.unix(e.time).hour()

      let index = Math.floor(hour / 2)
      obj.y[index]++
    })

    list.push(obj)
  }

  utils.replaceData(path.join(__dirname, '../pages/data.js'), '$timeData', JSON.stringify(list))
}

const genAtCountData = (result) => {
  let list = []

  for (let key in result) {
    let obj = {
      x: [],
      y: [],
      name: key,
      type: 'bar'
    }

    let tmpObj = {}
    result[key].map(e => {
      const count = utils.getAtCount(e.msg)

      for (let atKey in count) {
        if (tmpObj[atKey]) {
          tmpObj[atKey] = tmpObj[atKey] + count[atKey]
        } else {
          tmpObj[atKey] = count[atKey]
        }
      }
    })

    for (let tmpKey in tmpObj) {
      obj.x.push(tmpKey)
      obj.y.push(tmpObj[tmpKey])
    }

    list.push(obj)
  }

  utils.replaceData(path.join(__dirname, '../pages/data.js'), '$atCountData', JSON.stringify(list))
}

export default { init, genMsgNumData, genTimeData, genAtCountData }
