import fs from 'fs'

const replaceData = (path, pattern, replacement) => {
  var data = fs.readFileSync(path, 'utf8')
  var result = data.replace(pattern, replacement)

  fs.writeFileSync(path, result, 'utf8')
}

export default { replaceData }
