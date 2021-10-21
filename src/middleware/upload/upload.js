/*
    File upload
 */
import makeDirectory from './makeDirectory'
import path from 'path'
import sharp from 'sharp'
import {isObjectEmpty} from "../validate"
import nanoid from "nanoid"

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
const uploadImg = async (ctx, next) => {
  if(isObjectEmpty(ctx.request.files.avatar)  ){
    return next()
  }
  let avatarID = nanoid(10)
  let file = ctx.request.files.avatar
  let fileName = file.name.replace(/\s/g, '').split('.').slice(0, -1).join('.')
  let target = BASE_DIR + avatarID
  let thumbTarget = BASE_DIR + avatarID + '/thumb'
  let filePath = path.join(BASE_DIR, avatarID, fileName + '.webp')
  let thumbPath = BASE_DIR + avatarID + '/thumb/' + fileName + '.webp'
  let fileURL = DOMAIN + avatarID + '/' + fileName + '.webp'
  let thumb = DOMAIN + avatarID + '/thumb/' + fileName + '.webp'

  try{
    await makeDirectory(target)
    await makeDirectory(thumbTarget)

    const result = await sharp(ctx.request.files.avatar.path)
      .resize(600)
      .webp({quality: 80})
      .toFile(filePath)

    const avatarResult = await sharp(ctx.request.files.avatar.path)
      .resize(200)
      .webp({quality: 80})
      .toFile(thumbPath)

    if(result && avatarResult){
      ctx.request.files.avatar = {
        avatarID: avatarID,
        url: fileURL,
        thumb: thumb,
        name: fileName,
      }
    }
    return next()
  }catch (e){
    ctx.throw(422, {message: 'Failed to upload file'})
  }
}

export default uploadImg