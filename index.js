const sqlite3 = require('sqlite3').verbose()
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const nodejieba = require("nodejieba")
const initData = require('./src/initData.js')

const db = new sqlite3.Database('./data/MM.sqlite')

const TABLE_NAME = 'Chat_afa40067cf83d63eb9fbdc2933ae463d'
const MY_NICKNAME = 'tree_1111'

const TYPES = {
  systemMsg: 10000,   // 系统消息
  voiceMsg: 34,       // 语音
  emoji: 47,          // 表情
  videoMsg: 43,       // 小视频
  voipinviteMsg: 50,  // 视频/语音通话
  picture: 3,         // 图片
  location: 48,       // 位置
  idCard: 42,         // 名片
  url: 49             // 链接
}

var result = {}

function subMsg(msg, time, type, des) {
  let msgList
  let nickName
  let message

  if (des === 0) {
    nickName = MY_NICKNAME
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
  if (type === TYPES.voiceMsg) {
    return '[voiceMsg]'
  }

  if (type === TYPES.emoji) {
    return '[emoji]'
  }

  if (type === TYPES.voipinviteMsg) {
    return '[voipinviteMsg]'
  }

  if (type === TYPES.picture) {
    return '[picture]'
  }

  if (type === TYPES.idCard) {
    return '[idCard]'
  }

  return msg
}

function delDir(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file,index) {
      var curPath = path + "/" + file
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath)
      } else { // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

db.serialize(function() {
  db.each('SELECT CreateTime, Message, Type, Des FROM ' + TABLE_NAME, function(err, row) {
    if (row.Type === TYPES.systemMsg
      || row.Type == TYPES.location
      || row.Type == TYPES.url
      || row.Type == TYPES.videoMsg) {
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


  // const dir = path.join(__dirname, 'pages/json')
  // // delDir(dir)
  //
  // fs.mkdirSync(dir)
  // fs.writeFile(path.join(__dirname, 'pages/json/result.json'), JSON.stringify(result), err => {
  //   if (err) {
  //     console.log(err)
  //     throw err
  //   }
  // })
})
