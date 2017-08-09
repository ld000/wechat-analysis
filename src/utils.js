import fs from 'fs'

/**
 * 替换 data 文件数据
 * @param  {[type]} path        [description]
 * @param  {[type]} pattern     [description]
 * @param  {[type]} replacement [description]
 * @return {[type]}             [description]
 */
const replaceData = (path, pattern, replacement) => {
  var data = fs.readFileSync(path, 'utf8')
  var result = data.replace(pattern, replacement)

  fs.writeFileSync(path, result, 'utf8')
}

/**
 * 得到一条信息中 @ 的次数
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
const getAtCount = (str) => {
  let result = {}

  let tmp = ''
  for (let index in str) {
    let char = str[index]

    if (char === '@') {
      tmp = '@'
      continue
    }

    if (tmp.startsWith('@')) {
      if (char === ' ' || char === ' ') {
        if (result[tmp]) {
          result[tmp] = result[tmp] + 1
        } else {
          result[tmp] = 1
        }

        tmp = ''

        continue
      }

      tmp += char
    }
  }

  return result
}

export default { replaceData, getAtCount }
