import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {
        newUser: { type: Boolean, default: true },
    },
    { timestamps: true }
)

export default mongoose.model('Settings', schema)
