import User from "../models/User"
import {verifyJWT} from './utils'

let auth = {}

async function userLogout(ctx, next) {
  const isDev = process.env.NODE_ENV === 'development'
  const currentDomain = isDev ? process.env.LOCAL_DOMAIN : process.env.LIVE_DOMAIN
  const refreshToken = ctx.cookies.get("refreshToken")
  const {payload} = await verifyJWT(refreshToken)
  const res = await User.findOneAndUpdate(
    {_id: payload.userId},
    {$set: {'userSession.valid': false}}
  )

  if (res) {
    ctx.cookies.set('token', null, {domain: currentDomain, maxAge: 0})
    ctx.cookies.set('user', null, {domain: currentDomain, maxAge: 0})
    ctx.cookies.set('refreshToken', null, {domain: currentDomain, maxAge: 0})
    return ctx.state.user = null
  }
  return next()
}

auth.isUser = async (ctx, next) => {
  try {
    const token = ctx.cookies.get('token')
    if (!token) {
      await userLogout(ctx, next)
      ctx.throw(440, 'Unauthorized!')
    }
    if (ctx.state.user) {
      return next()
    }
    ctx.throw(401, {message: 'User does not have sufficient permissions'})
  } catch (error) {
    ctx.throw(error)
  }
}

auth.isAdmin = async (ctx, next) => {
  try {
    const token = ctx.cookies.get('token')

    if (!token) {
      await userLogout(ctx, next)
      ctx.throw(440, 'Unauthorized!')
    }

    if (ctx.state.user && ctx.state.user.role === 'admin') {
      return next()
    }
    ctx.throw(401, {message: 'Not sufficient permissions'})
  } catch (error) {
    ctx.throw(401, error)
  }
}


export default auth
