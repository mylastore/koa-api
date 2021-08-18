import sharp from 'sharp'
import { isObjectEmpty, objectOnlyOne } from '../validate'
import { generateID } from '../utils'

const BASE_DIR = 'upload/'
const DOMAIN =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_PATH
        : process.env.PRODUCTION_PATH

const updateGallery = async (ctx, next) => {
    const body = ctx.request.body

    if (isObjectEmpty(ctx.request.files)) {
        return next()
    }
    const count = body.count
    const galleryID = body.galleryID
    const arr = ctx.request.files.file
    ctx.request.body.images = []

    if (count === '1') {
        let fileName =
            generateID(8) +
            '-' +
            arr.name
                .replace(/\s/g, '')
                .split('.')
                .slice(0, -1)
                .join('.')

        let filePath = BASE_DIR + galleryID + '/' + fileName + '.jpg' //Stitching file names
        let fileUrl = DOMAIN + galleryID + '/' + fileName + '.jpg'

        ctx.request.body.images.push({ name: fileName + '.jpg', src: fileUrl })

        await sharp(arr.path)
            .resize(900)
            .toFormat('jpg')
            .jpeg({ quality: 80 })
            .toFile(filePath)

        return next()
    }

    for (var i = 0, len = arr.length; i < len; i++) {
        let fileName =
            generateID(8) +
            '-' +
            arr[i].name
                .replace(/\s/g, '')
                .split('.')
                .slice(0, -1)
                .join('.')

        let filePath = BASE_DIR + galleryID + '/' + fileName + '.jpg' //Stitching file names
        let fileUrl = DOMAIN + galleryID + '/' + fileName + '.jpg'

        ctx.request.body.images.push({ name: fileName + '.jpg', src: fileUrl })

        await sharp(arr[i].path)
            .resize(900)
            .toFormat('jpg')
            .jpeg({ quality: 80 })
            .toFile(filePath)
    }
    return next()
}

export default updateGallery
