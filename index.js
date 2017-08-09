import fs from 'fs'
import path from 'path'
import nodejieba from "nodejieba"
import initData from './src/initData.js'
import _ from './config/config.js'

const sqlite3 = new require('sqlite3').verbose()
const db = new sqlite3.Database(_.DB_PATH)

var result = {}

function subMsg(msg, time, type, des) {
  let msgList
  let nickName
  let message

  if (des === 0) {
    nickName = _.MY_NICKNAME
    message = switchType(msg, type)
  } else {
    let msgArray = msg.split(':\n')

    nickName = msgArray[0]
    message = switchType(msgArray[1], type)
  }

  // console.log(nickName + ': ' + message)

  let tempList = result[nickName]
  if (tempList) {
    tempList.push({
      time: time,
      msg: message
    })
  } else {
    result[nickName] = [{
      time: time,
      msg: message
    }]
  }
}

function switchType(msg, type) {
  if (type === _.TYPES.voiceMsg) {
    return '[voiceMsg]'
  }

  if (type === _.TYPES.emoji) {
    return '[emoji]'
  }

  if (type === _.TYPES.voipinviteMsg) {
    return '[voipinviteMsg]'
  }

  if (type === _.TYPES.picture) {
    return '[picture]'
  }

  if (type === _.TYPES.idCard) {
    return '[idCard]'
  }

  return msg
}

db.serialize(function() {
  db.each('SELECT CreateTime, Message, Type, Des FROM ' + _.TABLE_NAME, function(err, row) {
    if (row.Type === _.TYPES.systemMsg
      || row.Type == _.TYPES.location
      || row.Type == _.TYPES.url
      || row.Type == _.TYPES.videoMsg) {
      return false
    }

    subMsg(row.Message, row.CreateTime, row.Type, row.Des)
  })
})

db.close(() => {
  initData.init()

  initData.genMsgNumData(result)
  initData.genTimeData(result)


  // nodejieba.load({
  //   userDict: './dict/user.dict.utf8',
  // });
  //
  // for (let key in result) {
  //   let obj = {}
  //
  //   result[key].map(e => {
  //     let cut = nodejieba.cut(e.msg)
  //
  //     cut.map(el => {
  //       let count = obj[el]
  //       if (count) {
  //         count++
  //         obj[el] = count
  //       } else {
  //         obj[el] = 1
  //       }
  //     })
  //   })
  //
  //   let list = []
  //   for (let key2 in obj) {
  //     list.push({
  //       text: key2,
  //       size: obj[key2]
  //     })
  //   }
  //
  //   list.sort(function(a,b) {
  //    return b.size - a.size
  //   })
  //   list = list.slice(0, 250)
  //
  //   fs.writeFile(path.join(__dirname, key + '.result.json'), JSON.stringify(list), err => {
  //     if (err) {
  //       throw err
  //     }
  //   })
  // }
})
