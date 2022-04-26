import Router from 'koa-router'
import auth from '../middleware/auth'
import SettingsController from '../controllers/settings'

const router = new Router()
const controller = new SettingsController()

router.get('/api/admin/get-settings', auth.isAdmin, async ctx => {
    await controller.getSettings(ctx)
})

router.post('/api/admin/update-settings', auth.isAdmin, async ctx => {
    await controller.updateSettings(ctx)
})

export default router
