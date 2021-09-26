import Router from 'koa-router'
import auth from '../middleware/auth'
import BlogController from '../controllers/blog'
import uploadImg from '../middleware/upload/upload'
import uploadEditorImages from '../middleware/upload/editorImageUpload'

const router = new Router()
const controller = new BlogController()

//public routes
router.post('/api/get-public-blog/:slug', async ctx => {
  await controller.getPublicBlog(ctx)
})

router.post('/api/blog/images', auth.isUser, uploadEditorImages, async (ctx, next) => {
  await controller.blogImages(ctx, next)
})

router.post('/api/blog/image', auth.isUser, uploadImg, async (ctx, next) => {
  await controller.blogImage(ctx, next)
})

router.post('/api/create-blog', auth.isUser, async ctx => {
  await controller.createBlog(ctx)
})

router.post('/api/user/blogs/:page', auth.isUser, async ctx => {
  await controller.getAllUserBlogs(ctx)
})

router.get('/api/blogs/category/:category/:page', async (ctx) => {
  await controller.getBlogsByCategory(ctx)
})

router.get('/api/blogs/tag/:tag/:page', async (ctx) => {
  await controller.getBlogsByTag(ctx)
})

router.get('/api/get-blog/:slug', auth.isUser, auth.isBlogAuthor, async ctx => {
  await controller.getBlog(ctx)
})

router.get('/api/categories-tags', async ctx => {
  await controller.getCategoriesAndTags(ctx)
})

router.delete(
  '/api/blog/delete/:slug',
  auth.isUser,
  auth.isBlogAuthor,
  async (ctx, next) => {
    await controller.deleteBlog(ctx, next)
  }
)

router.patch('/api/blog/:slug', auth.isUser, auth.isBlogAuthor, async (ctx, next) => {
    await controller.updateBlog(ctx, next)
  }
)

router.post('/api/blog/related', async ctx => {
  await controller.getRelatedBlogs(ctx)
})

router.post('/api/blogs/:page', async ctx => {
  await controller.getAllPublishedBlogs(ctx)
})

router.get('/api/blogs/search', async ctx => {
  await controller.search(ctx)
})

router.delete(
  '/api/blog/delete-img/:slug',
  auth.isUser,
  auth.isBlogAuthor,
  async (ctx, next) => {
    await controller.deleteImg(ctx, next)
  }
)

export default router
