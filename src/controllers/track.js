import Track from '../models/Track'
import slugify from 'slugify'
import mongoError from '../middleware/mongoErrors'

class TrackController {

  async addTrack(ctx){
    const {album, artist, duration, guid, thumb, title} = ctx.request.body

    const newAlbum = album.replace(/ *\[[^\]]*]/g, '')
    const newTitle = title.replace(/ *\[[^\]]*]/g, '')
    //album.replace(/ *\[[^\]]*]/g, '')
    console.log('album? ',newAlbum)
    //console.log('album' ,album)

    const thumbObj = {
      url: thumb,
      alt: slugify(newTitle).toLowerCase()
    }
    const durationTime = parseInt(duration)

    try{
      let exist = await Track.exists({ guid: guid})

      if (exist) {
        ctx.throw(422, 'Track already exist')
      }
      const track = new Track({
        album: newAlbum,
        artist,
        duration: durationTime,
        guid,
        title: newTitle,
        cover: thumbObj
      })

      const error = track.validateSync()
      if (error) {
        ctx.throw(422, mongoError(error))
      }
      return ctx.body = await track.save()
    }catch (err){
      ctx.throw(422, err)
    }

  }

  async getTracks(ctx){
    try{
      return ctx.body = await Track.find({}).sort({createdAt: -1} ).limit(10)
    }catch (err){
      ctx.throw(422, err)
    }
  }


}

export default TrackController