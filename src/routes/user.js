import Router from 'koa-router'
import auth from '../middleware/auth'
import UserController from '../controllers/user'

const router = new Router()

router.get('/', async (ctx) => {
    ctx.body = { message: 'Hi there. ' + process.env.NPM_PACKAGE_VERSION }
})

const userController = new UserController()

router.post('/api/user/register', async (ctx) => {
    await userController.register(ctx)
})

router.post('/api/user/login', async (ctx) => {
    await userController.login(ctx)
})

router.post('/api/user/logout', async (ctx) => {
    await userController.logOut(ctx)
})

router.post('/api/user/forgot', async (ctx) => {
    await userController.forgot(ctx)
})

router.post('/api/user/reset-password', async (ctx) => {
    await userController.resetPassword(ctx)
})

router.post('/api/user/update-password', auth.isUser, async (ctx) => {
    await userController.updatePassword(ctx)
})

router.post('/api/user/account', auth.isUser, async (ctx) => {
    await userController.account(ctx)
})

router.get('/api/user/profile/:username', auth.isUser, async (ctx) => {
    await userController.getProfile(ctx)
})

router.get('/api/user/public/:username', async (ctx) => {
    await userController.publicProfile(ctx)
})

router.patch('/api/user/account/:username', auth.isUser, async (ctx) => {
    await userController.updateAccount(ctx)
})

router.post('/api/user/username/:username', auth.isUser, async ctx => {
    await userController.updateUserName(ctx)
})

router.post('/api/user/delete', auth.isUser, async (ctx) => {
    await userController.deleteUser(ctx)
})

// ADMIN USER ROUTES
router.post('/api/user/settings/:username', auth.isAdmin, async (ctx) => {
    await userController.getAdminSettings(ctx)
})

router.get('/api/admin/users/:page', auth.isAdmin, async (ctx) => {
    await userController.adminGetUsers(ctx)
})

router.get('/api/admin/user/:id', auth.isAdmin, async (ctx) => {
    await userController.adminGetUser(ctx)
})

router.patch('/api/admin/update-settings', auth.isAdmin, async (ctx) => {
    await userController.updateSettings(ctx)
})

router.get('/api/admin/stats', auth.isAdmin, async (ctx) => {
    await userController.getStats(ctx)
})

router.post('/api/user/account-activation', async (ctx) => {
    await userController.accountActivation(ctx)
})

router.post('/api/user/google-login', async ctx => {
    await userController.googleLogin(ctx)
})

export default router
