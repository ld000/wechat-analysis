const fs = require('fs')
const path = require('path')
const utils = require('./utils.js')
const moment = require('moment')

exports.init = function() {
  let str = 'var msgNumData = $msgNumData\n'
  str += 'var timeData = $timeData\n'

  fs.writeFileSync(path.join(__dirname, '../pages/data.js'), str, 'utf8')
}

exports.genMsgNumData = function(result) {
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

exports.genTimeData = function(result) {
  let list = []

  let barData = {
    x: ['0-2', '2-4', '4-6', '6-8', '8-10', '10-12', '12-14', '14-16', '16-18', '18-20', '20-22', '22-24'],
    y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    name: '',
    type: 'bar'
  }

  for (let key in result) {
    let obj = Object.assign({}, barData, { name: key, y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] })

    result[key].map(e => {
      let hour = moment.unix(e.time).hour()

      let index = Math.floor(hour / 2)
      obj.y[index]++
    })

    list.push(obj)
  }

  utils.replaceData(path.join(__dirname, '../pages/data.js'), '$timeData', JSON.stringify(list))
}
