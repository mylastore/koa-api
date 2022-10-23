'use strict'

require('dotenv').config()

import mongoose from 'mongoose'
import User from '../models/User'
import data from '../seed/data'

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
            await model.deleteMany({}, () => {})
        }
    }

    async pushDataToDb() {
        await this.users.forEach(async user => {
            await new User(user).save(() => {})
        })
        console.log('Database Populated!')
    }

    async seedDb() {
        await this.cleanDb()
        await this.pushDataToDb()
    }
}

const dbUri =
    process.env.NODE_ENV === 'development'
        ? process.env.DB_LOCAL
        : process.env.DB_URI
mongoose
    .connect(dbUri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        const db = new SeedData()
        await db.seedDb()
        console.log('You can close connection now by pressing ctr+c')
    })
    .catch(err => console.log(err))
