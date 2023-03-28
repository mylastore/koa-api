const mongoose = require('mongoose')
const defaultAvatar = process.env.DEFAULT_AVATAR

/**
 * Random number generator function
 * @returns {number}
 *
 */

module.exports = {
    users: [
        {
            _id: mongoose.Types.ObjectId(),
            email: 'me1@me.com',
            avatar: defaultAvatar,
            password: 'Password1',
            role: 'admin',
            name: 'David Montoya',
        },
        {
            _id: mongoose.Types.ObjectId(),
            email: 'me2@me.com',
            avatar: defaultAvatar,
            password: 'Password1',
            role: 'user',
            name: 'Jose Lima'
        },
        {
            _id: mongoose.Types.ObjectId(),
            email: 'me3@me.com',
            avatar: defaultAvatar,
            password: 'Password1',
            role: 'user',
            name: 'Maria Lopez'
        },
        {
            _id: mongoose.Types.ObjectId(),
            email: 'me4@me.com',
            avatar: defaultAvatar,
            password: 'Password1',
            role: 'user',
            name: 'Tina Turner'
        },
        {
            _id: mongoose.Types.ObjectId(),
            email: 'me5@me.com',
            avatar: defaultAvatar,
            password: 'Password1',
            role: 'user',
            name: 'Henry Carpio'
        },
        {
            _id: mongoose.Types.ObjectId(),
            email: 'me6@me.com',
            avatar: defaultAvatar,
            password: 'Password1',
            role: 'user',
            name: 'Lincoln Abraham'
        },
        {
            _id: mongoose.Types.ObjectId(),
            email: 'me7@me.com',
            avatar: defaultAvatar,
            password: 'Password1',
            role: 'user',
            name: 'Americo Bespusio'
        },
        {
            _id: mongoose.Types.ObjectId(),
            email: 'me8@me.com',
            avatar: defaultAvatar,
            password: 'Password1',
            role: 'user',
            name: 'Fernando Valenzuela'
        },
        {
            _id: mongoose.Types.ObjectId(),
            email: 'me9@me.com',
            avatar: defaultAvatar,
            password: 'Password1',
            role: 'user',
            name: 'Jeff Bundy'
        },
        {
            _id: mongoose.Types.ObjectId(),
            email: 'me10@me.com',
            avatar: defaultAvatar,
            password: 'Password1',
            role: 'user',
            name: 'Irlanda Croesia'
        },
        {
            _id: mongoose.Types.ObjectId(),
            email: 'me11@me.com',
            avatar: defaultAvatar,
            password: 'Password1',
            role: 'user',
            name: 'Rafael Don Part'
        },
        {
            _id: mongoose.Types.ObjectId(),
            email: 'me12@me.com',
            avatar: defaultAvatar,
            password: 'Password1',
            role: 'user',
            name: 'Ana Lima Peru'
        },
        {
            _id: mongoose.Types.ObjectId(),
            email: 'me13@me.com',
            avatar: defaultAvatar,
            password: 'Password1',
            role: 'user',
            name: 'Flor Luz'
        },
        {
            _id: mongoose.Types.ObjectId(),
            email: 'me14@me.com',
            avatar: defaultAvatar,
            password: 'Password1',
            role: 'user',
            name: 'Timmoty MaCbay'
        },
        {
            _id: mongoose.Types.ObjectId(),
            email: 'me15@me.com',
            avatar: defaultAvatar,
            password: 'Password1',
            role: 'user',
            name: 'Anastasia Laruza'
        },
        {
            _id: mongoose.Types.ObjectId(),
            email: 'me16@me.com',
            avatar: defaultAvatar,
            password: 'Password1',
            role: 'user',
            name: 'Naomi Ferguson'
        },
        {
            _id: mongoose.Types.ObjectId(),
            email: 'me17@me.com',
            avatar: defaultAvatar,
            password: 'Password1',
            role: 'user',
            name: 'Tempi Arizona'
        },
        {
            _id: mongoose.Types.ObjectId(),
            email: 'me18@me.com',
            avatar: defaultAvatar,
            password: 'Password1',
            role: 'user',
            name: 'Julieta Romeo'
        },
        {
            _id: mongoose.Types.ObjectId(),
            email: 'me19@me.com',
            avatar: defaultAvatar,
            password: 'Password1',
            role: 'user',
            name: 'Jen Jhonson'
        },
        {
            _id: mongoose.Types.ObjectId(),
            email: 'me20@me.com',
            avatar: defaultAvatar,
            password: 'Password1',
            role: 'user',
            name: 'Susan Lyn'
        },
    ],
}
