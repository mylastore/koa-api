'use strict'
require('dotenv').config()

const isDev = (process.env.NODE_ENV === 'development')
const port = process.env.PORT
const src = isDev ? './src/index' : './build/index'

// setting to support to used import instead of required
require('@babel/polyfill')
if (isDev) {
  require('@babel/register')
}

const app = require(src).default

//Here we're assigning the server to a variable because
//we're going to want to manually rip down the server in testing
const server = app.listen(port)

console.log('http://localhost:' + port)
console.log("Running in " + process.env.NODE_ENV + " v" + process.env.NPM_PACKAGE_VERSION)

//Exporting the actual server here for testing availability
module.exports = {server: server}