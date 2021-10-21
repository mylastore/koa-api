import makeDirectory from './makeDirectory'
import sharp from 'sharp'
import { isObjectEmpty } from '../validate'
import Gallery from '../../models/Gallery'
import { generateID } from '../utils'

const BASE_DIR = 'upload/'
const DOMAIN =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_PATH
        : process.env.PRODUCTION_PATH

const saveGalleryName = async ctx => {
    const { name } = ctx.request.body
    try {
        const exist = await Gallery.exists({ name: name || 'default' })
        if (exist) {
            ctx.throw(422, 'Gallery name already exist')
        }
        return await new Gallery({ name: name }).save()
    } catch (err) {
        ctx.throw(422, err)
    }
}

const addGallery = async (ctx, next) => {
    const body = ctx.request.body
    if (isObjectEmpty(ctx.request.files)) {
        return next()
    }
    // save gallery name first so that we get an gallery ID
    const res = await saveGalleryName(ctx)
    const count = body.imageCount
    let arr = ctx.request.files.file
    let galleryID = res._id
    let target = BASE_DIR + galleryID

    if (res) {
        makeDirectory(target)
        ctx.request.body.images = []
        ctx.request.body.galleryID = galleryID

        if (count === '1') {
            let fileName =
                generateID(8) +
                '-' +
                arr.name
                    .replace(/\s/g, '')
                    .split('.')
                    .slice(0, -1)
                    .join('.')

            //set default image new name and new extension
            if (body.defaultImg === arr.name) {
                ctx.request.body.defaultImg = {
                    name: fileName + '.jpg',
                    src: DOMAIN + galleryID + '/' + fileName + '.jpg',
                    alt: fileName,
                }
            }

            let filePath = BASE_DIR + galleryID + '/' + fileName + '.jpg' //Stitching file names
            let fileUrl = DOMAIN + galleryID + '/' + fileName + '.jpg'
            let imgObject = {
                name: fileName + '.jpg',
                src: fileUrl,
                alt: fileName,
            }
            ctx.request.body.images.push(imgObject)

            await sharp(arr.path)
                .resize(900)
                .toFormat('jpg')
                .jpeg({ quality: 80 })
                .toFile(filePath)
            return next()
        }

        ctx.request.files.file.forEach(file => {
            let fileName =
                generateID(8) +
                '-' +
                file.name
                    .replace(/\s/g, '')
                    .split('.')
                    .slice(0, -1)
                    .join('.')

            //set default image new name and new extension
            if (ctx.request.body.defaultImg === file.name) {
                ctx.request.body.defaultImg = {
                    name: fileName + '.jpg',
                    src: DOMAIN + galleryID + '/' + fileName + '.jpg',
                    alt: fileName,
                }
            }

            let filePath = BASE_DIR + galleryID + '/' + fileName + '.jpg' //Stitching file names
            let fileUrl = DOMAIN + galleryID + '/' + fileName + '.jpg'
            let imgObject = {
                name: fileName + '.jpg',
                src: fileUrl,
                alt: fileName,
            }
            ctx.request.body.images.push(imgObject)

            sharp(file.path)
                .resize(900)
                .toFormat('jpg')
                .jpeg({ quality: 80 })
                .toFile(filePath)
        })
        return next()
    }
}

export default addGallery
