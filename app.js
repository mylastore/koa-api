'use strict'
require('dotenv').config()
const https = require('https')
const fs = require('fs')
let options

const isDev = (process.env.NODE_ENV === 'development')
const port = process.env.PORT
const src = isDev ? './src/index' : './build/index'
const pemKey = isDev ? fs.readFileSync(process.env.LOCAL_KEY) : {}
const pemCert = isDev ? fs.readFileSync(process.env.LOCAL_CERT) : {}

options = {
  key: pemKey,
  cert: pemCert
}

// setting to support to used import instead of required
require('@babel/polyfill')
if (isDev) {
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