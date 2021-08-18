import Gallery from '../models/Gallery'
import removeDirectory from '../middleware/upload/removeDirectory'
import removeFile from '../middleware/upload/removeFile'

const DOMAIN =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_PATH
        : process.env.PRODUCTION_PATH

class GalleryController {
    async saveGallery(ctx, next) {
        const { defaultImg, images, galleryID } = ctx.request.body
        try {
            const data = {
                defaultImg: defaultImg,
                images: images,
            }
            return (ctx.body = await Gallery.findOneAndUpdate(
                { _id: galleryID },
                data,
                { new: true }
            ))
        } catch (err) {
            ctx.throw(422, err)
        }
    }

    async updateGallery(ctx) {
        const { images, galleryID } = ctx.request.body
        try {
            return (ctx.body = await Gallery.findOneAndUpdate(
                { _id: galleryID },
                { $push: { images: images } },
                { new: true }
            ))
        } catch (err) {
            ctx.throw(422, err)
        }
    }

    async deleteImage(ctx) {
        const { galleryID, name, id } = ctx.request.body
        const path = 'upload/' + galleryID + '/' + name
        try {
            removeFile(path)
            ctx.body = await Gallery.findOneAndUpdate(
                { _id: galleryID },
                { $pull: { images: { _id: id } } },
                { safe: true, upsert: true, new: true }
            )
        } catch (err) {
            ctx.throw(422, err)
        }
    }

    async updateGallerySave(ctx) {
        const { defaultImg, images, name, galleryID } = ctx.request.body

        const defaultImgObj = {
            name: defaultImg,
            src: DOMAIN + galleryID + '/' + defaultImg,
            alt: defaultImg,
        }

        try {
            const data = {
                defaultImg: defaultImgObj,
                images: images,
                name: name,
            }
            return (ctx.body = await Gallery.findOneAndUpdate(
                { _id: galleryID },
                data,
                { new: true }
            ))
        } catch (err) {
            ctx.throw(422, err)
        }
    }

    async publishedGallery(ctx) {
        const body = ctx.request.body
        try {
            await Gallery.findOneAndUpdate(
                { _id: body._id },
                { published: body.published },
                { new: true }
            )
            ctx.body = { status: 200, message: 'Gallery is now published' }
        } catch (err) {
            ctx.throw(422, err)
        }
    }

    async getGalleries(ctx) {
        const perPage = 10
        const page = ctx.params.page || 1
        try {
            const galleries = await Gallery.find()
                .sort({ createdAt: -1 })
                .skip(perPage * page - perPage)
                .limit(perPage)

            const totalItems = await Gallery.countDocuments({})
            return (ctx.body = {
                totalItems: totalItems,
                perPage: perPage,
                galleries: galleries,
            })
        } catch (err) {
            ctx.throw(422, err)
        }
    }

    async getPublishedGalleries(ctx) {
        try {
            ctx.body = await Gallery.find({ published: true }).sort({
                createdAt: -1,
            })
        } catch (err) {
            ctx.throw(422, err)
        }
    }

    async getGallery(ctx) {
        const id = ctx.params.id

        try {
            ctx.body = await Gallery.findOne({ _id: id }).select('images')
        } catch (err) {
            ctx.throw(422, err)
        }
    }

    async getGalleryToUpdate(ctx) {
        const id = ctx.params.id
        try {
            ctx.body = await Gallery.findOne({ _id: id })
        } catch (err) {
            ctx.throw(422, err)
        }
    }

    async getHomeGallery(ctx) {
        try {
            const res = await Gallery.findOne({ name: 'home' })
            return (ctx.body = res)
        } catch (err) {
            ctx.throw(422, err)
        }
    }

    async deleteGallery(ctx) {
        const { id } = ctx.request.body
        try {
            const res = await Gallery.deleteOne({ _id: id })
            if (res) {
                await removeDirectory(`upload/${id}`)
                return (ctx.body = {
                    status: 200,
                    message: 'Gallery was deleted',
                })
            }
        } catch (err) {
            ctx.throw(422, err)
        }
    }
}

export default GalleryController
