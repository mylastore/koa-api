'use strict'

import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import User from '../models/User.js'
import data from './data.js'

/**
 * Class - deletes current data and seed new one
 * @class
 * @category Seeding Data
 */
class SeedData {
  constructor() {
    this.users = data.users
    this.models = [User]
  }

  async cleanDb() {
    for (let model of this.models) {
      await model.deleteMany({})
    }
  }

  async pushDataToDb() {
    await this.users.forEach(async user => {
      await new User(user).save()
    })
    console.log('Database Populated!')
  }

  async seedDb() {
    await this.cleanDb()
    await this.pushDataToDb()
  }
}

const uri = process.env.NODE_ENV === 'development' ? process.env.DB_LOCAL : process.env.DB_URI
const options = { useNewUrlParser: true, useUnifiedTopology: true,}
main().catch(err => console.log(err));

async function main() {
  if( await mongoose.connect(uri, options)){
    const db = new SeedData()
    await db.seedDb()
    console.log('You can close the connection by pressing ctr+c')
  }
}
