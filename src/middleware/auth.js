let auth = {}

auth.isUser = async (ctx, next) => {
    try {
        const token = ctx.cookies.get('token')
        if (!token) ctx.throw(440, 'Unauthorized!')
        if (ctx.state.user) {
            return next()
        }
        ctx.throw(401, { message: 'User does not have sufficient permissions' })
    } catch (error) {
        ctx.throw(error)
    }
}

auth.isAdmin = async (ctx, next) => {
    try {
        const token = ctx.cookies.get('token')
        if (!token) ctx.throw(440, 'Unauthorized!')

        if (ctx.state.user && ctx.state.user.role === 'admin') {
            return next()
        }
        ctx.throw(401, { message: 'Not sufficient permissions' })
    } catch (error) {
        ctx.throw(401, error)
    }
}

export default auth
