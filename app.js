'use strict'

require('dotenv').config()
const https = require('https')
const fs = require('fs')

const env = process.env.NODE_ENV
const port = process.env.PORT
const src = env === 'production' ? './build/index' : './src/index'

const options = {
  key: fs.readFileSync(process.env.LOCAL_KEY_PEM),
  cert: fs.readFileSync(process.env.LOCAL_CERT_PEM),
}

// setting to support to used import instead of required
require('@babel/polyfill')
if (env === 'development') {
  require('@babel/register')
}

const app = require(src).default

//Here we're assigning the server to a variable because
//we're going to want to manually rip down the server in testing
const server = https.createServer(options, app.callback()).listen(port)

console.log('https://localhost:' + port)
console.log("Running in " + process.env.NODE_ENV + " v" + process.env.NPM_PACKAGE_VERSION)

//Exporting the actual server here for testing availability
module.exports = {server: server}