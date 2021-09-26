import Router from 'koa-router'
import auth from '../middleware/auth'
import CategoryController from '../controllers/category'

const controller = new CategoryController()
const router = new Router()

router.post('/api/category', auth.isUser, async (ctx) => {
    await controller.createCategory(ctx)
})

router.delete('/api/category/:slug', auth.isAdmin, async (ctx) => {
    await controller.deleteCategory(ctx)
})

export default router
