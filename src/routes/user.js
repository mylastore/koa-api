import Router from '@koa/router'
import auth from '../middleware/auth'
import UserController from '../controllers/user'

const router = new Router()

router.get('/', async ctx => {
    ctx.body = ' Hi there. '
})

const userController = new UserController()

router.post('/api/user/register', async ctx => {
    await userController.register(ctx)
})

router.post('/api/user/login', async ctx => {
    await userController.login(ctx)
})

router.post('/api/user/logout', async ctx => {
    await userController.logOut(ctx)
})

router.post('/api/user/forgot', async ctx => {
    await userController.forgot(ctx)
})

router.post('/api/user/reset-password', async ctx => {
    await userController.resetPassword(ctx)
})

router.post('/api/user/update-password', auth.isUser, async ctx => {
    await userController.updatePassword(ctx)
})

router.get('/api/user/profile/:id', auth.isUser, async ctx => {
    await userController.getProfile(ctx)
})

router.get('/api/user/public/:id', async ctx => {
    await userController.publicProfile(ctx)
})

router.patch('/api/user/account/:id', auth.isUser, async ctx => {
    await userController.updateAccount(ctx)
})

router.post('/api/user/delete', auth.isUser, async ctx => {
    await userController.deleteUser(ctx)
})

// ADMIN USER ROUTES
router.get('/api/admin/users/:page', auth.isAdmin, async ctx => {
    await userController.adminGetUsers(ctx)
})

router.get('/api/admin/user/:id', auth.isAdmin, async ctx => {
    await userController.adminGetUser(ctx)
})

router.get('/api/admin/stats', auth.isAdmin, async ctx => {
    await userController.getStats(ctx)
})

router.post('/api/user/account-activation', async ctx => {
    await userController.accountActivation(ctx)
})

export default router
