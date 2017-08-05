const sqlite3 = require('sqlite3').verbose()
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

function subMsg(msg, type, des) {
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
    tempList.push(message)
  } else {
    result[nickName] = [message]
  }
}

function switchType(msg, type) {
  if (type === TYPES.voiceMsg) {
    return '[voiceMsg]'
  }

  if (type === TYPES.emoji) {
    return ['emoji']
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

db.serialize(function() {
  db.each('SELECT CreateTime, Message, Type, Des FROM ' + TABLE_NAME, function(err, row) {
    if (row.Type === TYPES.systemMsg
      || row.Type == TYPES.location
      || row.Type == TYPES.url
      || row.Type == TYPES.videoMsg) {
      return false
    }

    subMsg(row.Message, row.Type, row.Des)
  })
})

db.close(() => {
  // console.log(result)
})
