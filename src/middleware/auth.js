import jsonwebtoken from 'jsonwebtoken'
import User from '../models/User'

let auth = {}
let role

async function getJwtToken(ctx) {
    if (!ctx.header || !ctx.header.authorization) {
        return
    }
    const parts = ctx.header.authorization.split(' ')
    if (parts.length === 2) {
        const scheme = parts[0]
        const credentials = parts[1]
        if (/^Bearer$/i.test(scheme)) {
            return credentials
        }
    }
}

async function validateJWT(ctx) {
    const secret = process.env.JWT_SECRET
    const token = await getJwtToken(ctx)
    if (!secret || !token)
        ctx.throw(401, { message: 'Access to resource not allow' })
    //jsonwebtoken.verify also checks for expiration
    await jsonwebtoken.verify(token, secret, async (err, decoded) => {
        if (err) {
            ctx.throw(440, 'Session has expired.')
        } else {
            const user = await User.findOne({ _id: decoded._id })
            if (!user) {
                ctx.throw(404, 'User not found.')
            }
            ctx.state.user = user.toAuthJSON()
            role = decoded.role
        }
    })
}

auth.isUser = async (ctx, next) => {
    await validateJWT(ctx)
    try {
        if (role) {
            return next()
        }
        ctx.throw(401, { message: 'Not sufficient permissions' })
    } catch (error) {
        ctx.throw(error)
    }
}

auth.isAdmin = async (ctx, next) => {
    await validateJWT(ctx)
    try {
        if (role === 'admin') {
            return next()
        }
        ctx.throw(401, { message: 'Not sufficient permissions' })
    } catch (error) {
        ctx.throw(401, error)
    }
}

export default auth
