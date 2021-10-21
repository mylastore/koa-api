import Router from 'koa-router'
import TrackController from '../controllers/track'

const controller = new TrackController()
const router = new Router()

router.post('/api/track', async (ctx) => {
    await controller.addTrack(ctx)
})

router.get('/api/tracks', async (ctx) => {
    await controller.getTracks(ctx)
})

export default router
