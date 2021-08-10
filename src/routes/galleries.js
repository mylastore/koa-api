import Router from 'koa-router'
import GalleryController from '../controllers/gallery'
import addGallery from "../middleware/upload/addGallery"
import updateGallery from "../middleware/upload/updateGallery"
import auth from '../middleware/auth'

const router = new Router()
const controller = new GalleryController()

router.post('/api/gallery/save-gallery', auth.isAdmin, addGallery, async (ctx, next) => {
    await controller.saveGallery(ctx, next)
})

router.post('/api/gallery/published', auth.isAdmin, addGallery, async (ctx, next) => {
    await controller.publishedGallery(ctx, next)
})

router.get('/api/gallery/get-galleries/:page', auth.isAdmin, async (ctx, next) => {
    await controller.getGalleries(ctx, next)
})

router.post('/api/gallery/delete', auth.isAdmin, async (ctx, next) => {
    await controller.deleteGallery(ctx, next)
})

router.get('/api/gallery/get-published-galleries', async (ctx, next) => {
    await controller.getPublishedGalleries(ctx, next)
})

router.get('/api/gallery/get-gallery/:id', async (ctx, next) => {
    await controller.getGallery(ctx, next)
})

router.get('/api/gallery/update-get/:id', async (ctx, next) => {
    await controller.getGalleryToUpdate(ctx, next)
})

router.post('/api/gallery/update', auth.isAdmin, updateGallery, async (ctx, next) => {
    await controller.updateGallery(ctx, next)
})

router.post('/api/gallery/delete-image', auth.isAdmin, async (ctx, next) => {
    await controller.deleteImage(ctx, next)
})

router.post('/api/gallery/update-save', auth.isAdmin, async (ctx, next) => {
    await controller.updateGallerySave(ctx, next)
})

router.get('/api/gallery/home-gallery', async (ctx, next) => {
    await controller.getHomeGallery(ctx, next)
})

export default router
