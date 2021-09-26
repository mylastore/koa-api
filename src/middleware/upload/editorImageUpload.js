import path from 'path'
import sharp from 'sharp'
import {isObjectEmpty} from '../validate'
import makeDirectory from './makeDirectory'
import nanoid from "nanoid";

const BASE_DIR = 'upload/'
const DOMAIN =
  process.env.NODE_ENV === 'development'
    ? process.env.APP_LOCAL_URL
    : process.env.APP_PRODUCTION_URL

/**
 * File upload
 * ps Generate file name
 * File paths are stored according date and time
 */
const uploadEditorImages = async (ctx, next) => {
  if (isObjectEmpty(ctx.request.files)) {
    return next()
  }
  let galID = nanoid(10)
  let file = ctx.request.files.file
  let fileName = file.name.replace(/\s/g, '').split('.').slice(0, -1).join('.')
  let target = BASE_DIR + galID
  let filePath = path.join(BASE_DIR, galID, fileName + '.webp') //Stitching file names
  let fileUrl = DOMAIN + galID + '/' + fileName + '.webp'

  makeDirectory(target)
  try{
    const result = await sharp(ctx.request.files.file.path)
      .resize(800)
      .webp({quality: 80})
      .toFile(filePath)

    if(result){
      ctx.request.files.file = {
        galID: galID,
        src: fileUrl,
        name: fileName,
        size: file.size
      }
    }
  }catch (err){
    ctx.throw(422, err)
  }
  return next()
}

export default uploadEditorImages