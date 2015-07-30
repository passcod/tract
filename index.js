#!/usr/bin/env node
var _ = require('lodash')
var env = require('node-env-file')
var fs = require('fs')
var Handlebars = require('handlebars')
var path = require('path')
var yaml = require('js-yaml')

process.argv.shift()
process.argv.shift()
if (process.argv.length < 1) {
  console.error('Usage: cejs <template.hbs> [data files...]')
  console.error('  Data files can be either JSON, YAML, .env')
  process.exit(64)
}

var cwd = process.cwd()
var templateFile = process.argv.shift()
var dataFiles = process.argv

var locals = {}
dataFiles.forEach(function(file) {
  var ext = _.last(file.split('.'))
  
  var contents
  if (ext === 'env') {
    contents = file;
  } else {
    try {
      contents = fs.readFileSync(path.join(cwd, file)).toString()
    } catch (e) {
      return console.error('[ERR] Failed to read ' + file)
    }
  }

  var parser = {
    json: JSON.parse,
    yaml: yaml.safeLoad,
    yml: yaml.safeLoad,
    env: env
  }[ext]

  if (!parser) {
    return console.error('[ERR] Did not find parser for ' + file)
  }

  var config
  try {
    config = parser(contents)
  } catch (e) {
    return console.error('[ERR] Failed to parse ' + file)
  }

  locals = _.merge(locals, config)
})

locals = _.merge(locals, process.env)
var template = Handlebars.compile(fs.readFileSync(templateFile).toString())
console.log(template(locals))

