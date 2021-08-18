import mongoose from 'mongoose'

const Schema = mongoose.Schema

const gallerySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: [64, 'Album name max characters length is 64'],
        },
        images: [
            {
                src: String,
                name: String,
                alt: String,
            },
        ],
        thumbs: [
            {
                src: String,
                name: String,
                alt: String,
            },
        ],
        published: {
            Boolean,
            default: false,
        },
        defaultImg: {
            name: String,
            src: String,
            alt: String,
        },
    },
    { timestamps: true }
)

export default mongoose.model('Gallery', gallerySchema)
