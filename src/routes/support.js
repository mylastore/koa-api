import Router from 'koa-router'
import SupportController from '../controllers/support'

const router = new Router()
const supportController = new SupportController()

router.post('/api/contact-author', async (ctx) => {
    await supportController.contactAuthor(ctx)
})

router.post('/api/support', async ctx => {
    await supportController.sendSupportEmail(ctx)
})

export default router
