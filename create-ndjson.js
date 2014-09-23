var fs = require('fs')
var path = require('path')

var tests = fs.readdirSync('./tests').filter(function (file) {
  return file.slice(-5) === '.json'
})

tests.forEach(function (file) {
  var meta = JSON.parse(fs.readFileSync(path.resolve('./tests/', file)))
  if(!meta.value) return true
  var delimiter = meta.delimiter || '\n'
  var ndjson = meta.values.map(function (obj) {
    return JSON.stringify(obj)
  }).join(delimiter) + delimiter
  fs.writeFileSync(path.resolve('./tests/', file.split('.')[0] + '.ndjson'), ndjson)
})
