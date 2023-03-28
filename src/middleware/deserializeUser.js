import {signJWT, verifyJWT} from './utils'
import User from '../models/User'

const isDev = process.env.NODE_ENV === 'development'
const currentDomain = isDev ? process.env.LOCAL_DOMAIN : process.env.LIVE_DOMAIN

async function getSession(id) {
  const user = await User.findOne({_id: id})
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

  const {payload, expired} = await verifyJWT(token)
  if (payload) {
    ctx.state.user = payload.userSession
    return next()
  }

  // expired token but valid access token
  const {payload: refresh} = expired && refreshToken ? await verifyJWT(refreshToken) : {payload: null}
  if (!refresh) {
    return next()
  }

  const session = await getSession(refresh.userId)

  if (!session) {
    return next()
  }
  const newToken = signJWT({userSession: session}, '30s')

  ctx.cookies.set('token', newToken, {
    domain: currentDomain,
    maxAge: 300000, // 5 minutes
    httpOnly: true,
    secure: true,
  })
  const data = verifyJWT(newToken).payload
  ctx.state.user = data.userSession

  return next()
}

export default deserializeUser
