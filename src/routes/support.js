import Router from 'koa-router'

import SupportController from '../controllers/support'

const router = new Router()

//Initial controller once for all routes
const supportController = new SupportController()

router.post('/api/contact-author', async (ctx, next) => {
    await supportController.contactAuthor(ctx)
})

router.post('/api/support', async ctx => {
    await supportController.sendSupportEmail(ctx)
})

export default router
