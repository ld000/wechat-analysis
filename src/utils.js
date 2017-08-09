const fs = require('fs')

exports.replaceData = function(path, pattern, replacement) {
  var data = fs.readFileSync(path, 'utf8')
  var result = data.replace(pattern, replacement)

  fs.writeFileSync(path, result, 'utf8')
}
