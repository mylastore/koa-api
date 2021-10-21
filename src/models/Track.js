import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const schema = new mongoose.Schema(
    {
        title: String,
        album: String,
        artist: String,
        duration: Number,
        cover: {
            url: String,
            alt: String,
        },
        guid: {
            type: String,
            unique: true,
        },
    },
    { timestamps: true }
)

schema.plugin(uniqueValidator, { message: '{PATH} already exist.' })
export default mongoose.model('Track', schema)
