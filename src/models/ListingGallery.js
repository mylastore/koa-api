import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ListingGallerySchema = new Schema(
    {
        gallery: [{ type: String }],
        listingId: {
            type: Schema.Types.ObjectId,
            ref: 'Listing',
        },
    },
    { timestamps: true }
)

export default mongoose.model('Gallery', ListingGallerySchema)
