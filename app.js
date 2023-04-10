'use strict'
require('dotenv').config()

const isDev = process.env.NODE_ENV === 'development'
const port = process.env.PORT
const src = isDev ? './src/index' : './build/index'
const fs = require('fs')
const https = require('https')
let options

require('@babel/polyfill')

if (isDev) {
  // needed to run the app
  require('@babel/register')
  options = {
    key: fs.readFileSync(process.env.LOCAL_KEY),
    cert: fs.readFileSync(process.env.LOCAL_CERT),
  }
}

//Here we're assigning the server to a variable because
//we're going to want to manually rip down the server in testing
const app = require(src).default
const server = isDev ? https.createServer(options, app.callback()).listen(port) : app.listen(port)

console.log('https://localhost:' + port)
console.log('Running in ' + process.env.NODE_ENV + ' v' + process.env.NPM_PACKAGE_VERSION)

//Exporting the actual server here for testing availability
module.exports = { server: server }
