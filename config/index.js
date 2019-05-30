const fs = require('fs')
const baseConfig = require('./base')
const devConfig = require('./config.dev')
const testConfig = require('./config.test')
const prodConfig = require('./config.prod')
const watchConfig = require('./config.watch')

const PRODUCTION = 'production'
const TESTING = 'testing'
const DEVELOPMENT = 'development'

const ENV = process.env.NODE_ENV
console.log('env:', ENV)

function getStatic() {
  if (ENV === PRODUCTION) {
    if (fs.existsSync(__dirname + '/static.prod.js')) return './static.prod'
  } else if (ENV === TESTING) {
    if (fs.existsSync(__dirname + '/static.test.js')) return './static.test'
  } else if (ENV === DEVELOPMENT) {
    if (fs.existsSync(__dirname + '/static.dev.js')) return './static.dev'
  } else {
    if (fs.existsSync(__dirname + '/static.local.js')) return './static.local'
  }
  return './static'
}

const STATIC = require(getStatic())

const config = ENV === PRODUCTION ? prodConfig
  : ENV === TESTING ? testConfig
    : ENV === DEVELOPMENT ? devConfig
      : watchConfig

module.exports = {
  ...baseConfig,
  ...config,
  PRODUCTION,
  TESTING,
  DEVELOPMENT,
  ENV,
  STATIC
}
