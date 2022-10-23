import { signJWT, verifyJWT } from './utils'
import User from '../models/User'

async function getSession(id) {
    const user = await User.findOne({ _id: id })
    if (user) {
        return user.userSession.valid ? user.userSession : null
    }
}

async function deserializeUser(ctx, next) {
    const token = ctx.cookies.get('token')
    const refreshToken = ctx.cookies.get('refreshToken')
    if (!token) {
        return next()
    }

    const { payload, expired } = await verifyJWT(token)
    // For a valid access token
    if (payload) {
        ctx.state.user = payload.userSession
        return next()
    }

    // expired but valid access token
    const { payload: refresh } =
        expired && refreshToken
            ? await verifyJWT(refreshToken)
            : { payload: null }
    if (!refresh) {
        return next()
    }

    const id = refresh.userId
    const session = await getSession(id)

    if (!session) {
        return next()
    }
    const newToken = signJWT({ userSession: session }, '60s')

    ctx.cookies.set('token', newToken, {
        sameSite: 'Lax',
        maxAge: 900000, // 15 minutes
        httpOnly: true,
        secure: true,
    })
    const data = verifyJWT(newToken).payload
    ctx.state.user = data.userSession

    return next()
}

export default deserializeUser
