'use strict'
// @ts-check

import Koa from 'koa'
import koaBody from 'koa-body'
import koaStatic from 'koa-static'
import cors from '@koa/cors'
import mongoose from 'mongoose'
import helmet from 'koa-helmet'
import koaJsonError from 'koa-json-error'
import deserializeUser from './middleware/deserializeUser'

//Routes
import userRouter from './routes/user'

const isDev = process.env.NODE_ENV === 'development'
const allowedDomains = isDev ? [process.env.ALLOWED_DEV_DOMAIN] : [process.env.ALLOWED_LIVE_DOMAIN]
const mongoDB = isDev ? process.env.DB_LOCAL : process.env.DB_URI

mongoose
    .connect(mongoDB, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log('DB: ', mongoDB))
    .catch(err => console.log(err))

//Initialize app
const app = new Koa()

require('koa-qs')(app, 'extended')

app.use(helmet())

// Log successful interactions
app.use(async (ctx, next) => {
    try {
        await next()
        console.info(
            ctx.method + ' ' + ctx.url + ' RESPONSE: ' + ctx.response.status
        )
    } catch (error) {}
})

// Apply error json handling and log
const errorOptions = {
    postFormat: (e, obj) => {
        if (!isDev) {
            console.log(obj)
            return obj
        }
        delete obj.stack
        delete obj.name
        return obj
    },
}
app.use(koaJsonError(errorOptions))

// return response time in X-Response-Time header
app.use(async function responseTime(ctx, next) {
    const t1 = Date.now()
    await next()
    const t2 = Date.now()
    ctx.set('X-Response-Time', Math.ceil(t2 - t1) + 'ms')
})

app.use(deserializeUser)

//For cors with options
app.use(
    cors({
        credentials: true,
        origin: ctx => {
            // Support for multiple allowed domains
            if (allowedDomains.indexOf(ctx.request.header.origin) > -1) {
                return ctx.request.header.origin
            }
            return allowedDomains[0] // we can't return void, so let's return one of the valid domains
        },
    })
)

app.use(
    koaBody({
        formLimit: '1mb',
        multipart: true, // Allow multiple files to be uploaded
        formidable: {
            maxFileSize: 200 * 1024 * 1024, //200MB size limit
            keepExtensions: true, //  Extensions to save images
            onFileBegin: (name, file) => {
                const fileName = file.name
                const picReg = /\.(png|jpeg?g|svg|webp|jpg)$/i
                if (!picReg.test(fileName)) {
                    new Error('File not supported')
                }
            },
            onEnd: (name, file) => {
                console.log('name? ', name)
                console.log('size.size ? ', file.size)
            },
        },
        onError: err => {
            if (err) {
                throw err
            }
            new Error('Oops! something went wrong. Try again.')
        },
    })
)

// Static Middleware
app.use(koaStatic('./upload'))
app.use(koaStatic('./public'))

// Routes & Router allow methods
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

export default app
