import slugify from 'slugify'
import Tag from '../models/Tag'
import mongoError from '../middleware/mongoErrors'

class TagController {
    async createTag(ctx) {
        const name = ctx.request.body.name

        const tag = new Tag({
            name: name,
            slug: slugify(name).toLowerCase(),
        })
        const error = tag.validateSync()
        if (error) {
            ctx.throw(422, mongoError(error))
        }

        try {
            return (ctx.body = await tag.save())
        } catch (err) {
            ctx.throw(422, mongoError(err))
        }
    }

    async deleteTag(ctx) {
        try {
            const slug = ctx.params.slug
            const delTag = await Tag.deleteOne({ slug })
            if (delTag) {
                ctx.body = {
                    status: 200,
                    message: 'Tag was deleted successfully',
                }
            }
        } catch (err) {
            ctx.throw(422, err)
        }
    }
}

export default TagController
