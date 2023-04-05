import Router from '@koa/router'
import auth from '../middleware/auth'
import UserController from '../controllers/user'

const router = new Router()

router.get('/', async ctx => {
  ctx.body = ' Hi there. '
})

const controller = new UserController()

router.post('/api/user/account-activation', async ctx => {
  await controller.accountActivation(ctx)
})

router.post('/api/user/register', async ctx => {
  await controller.register(ctx)
})

router.post('/api/user/login', async (ctx) => {
  await controller.login(ctx)
})

router.post('/api/user/logout', async ctx => {
  await controller.logOut(ctx)
})

router.post('/api/user/forgot', async ctx => {
  await controller.forgot(ctx)
})

router.post('/api/user/reset-password', async ctx => {
  await controller.resetPassword(ctx)
})

router.post('/api/user/update-password', auth.isUser, async ctx => {
  await controller.updatePassword(ctx)
})

router.post('/api/user/profile', auth.isUser, async ctx => {
  await controller.getProfile(ctx)
})

router.get('/api/user/public/:id', async ctx => {
  await controller.publicProfile(ctx)
})

router.patch('/api/user/account', auth.isUser, async ctx => {
  await controller.updateAccount(ctx)
})

router.post('/api/user/delete', auth.isUser, async ctx => {
  await controller.deleteUser(ctx)
})

// ADMIN USER ROUTES
router.get('/api/admin/users/:page', auth.isAdmin, async ctx => {
  await controller.adminGetUsers(ctx)
})

router.get('/api/admin/user/:id', auth.isAdmin, async ctx => {
  await controller.adminGetUser(ctx)
})

router.get('/api/admin/stats', auth.isAdmin, async ctx => {
  await controller.getStats(ctx)
})

export default router
