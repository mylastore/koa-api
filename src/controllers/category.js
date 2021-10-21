import Category from '../models/Category'
import slugify from 'slugify'
import mongoError from '../middleware/mongoErrors'

class CategoryController {
    async createCategory(ctx) {
        const name = ctx.request.body.name

        const category = new Category({
            name: name,
            slug: slugify(name).toLowerCase(),
        })
        const error = category.validateSync()
        if (error) {
            ctx.throw(422, mongoError(error))
        }

        try {
            return (ctx.body = await category.save())
        } catch (err) {
            ctx.throw(422, mongoError(err))
        }
    }

    async deleteCategory(ctx) {
        try {
            await Category.deleteOne({ slug: ctx.params.slug })
            return (ctx.body = {
                status: 200,
                message: 'Category was deleted successfully',
            })
        } catch (err) {
            ctx.throw(422, err)
        }
    }
}

export default CategoryController
