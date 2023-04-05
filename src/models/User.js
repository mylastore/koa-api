import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const { ObjectId } = mongoose.Schema

const sessionSchema = new mongoose.Schema({
  userId: ObjectId,
  role: String,
  name: String,
  valid: { type: Boolean, default: false },
})

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: [true, 'Email must be unique'],
      minlength: [2, 'Name minimum length is 2 characters'],
      maxlength: [32, 'Name maximum length is 32 characters'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Email is not valid',
      ],
    },
    role: { type: String, default: 'user' },
    password: {
      type: String,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(.{8,50})$/,
        'Password must be at least 8 characters and must contain 1 uppercase',
      ],
    },
    passwordResetToken: String,
    emailVerified: { type: Boolean, default: false },
    gender: { type: String, default: '' },
    location: {
      type: String,
      required: false,
      default: '',
      minlength: [2, 'Location minimum length is 2 characters'],
      maxlength: [60, 'Location maximum length is 60 characters'],
    },
    about: {
      type: String,
      default: '',
      minlength: [2, 'About minimum length is 2 characters'],
      maxlength: [2000, 'About maximum length is 2000 characters'],
    },
    website: {
      type: String,
      default: '',
      match: [
        /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/,
        'Website URL is invalid',
      ],
    },
    userSession: sessionSchema,
    avatar: { type: String, default: process.env.DEFAULT_AVATAR },
  },

  { timestamps: true }
)

userSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

//Every user have aces to this methods
userSchema.methods.comparePassword = async function(rawPassword) {
  return await bcrypt.compare(rawPassword, this.password)
}

userSchema.methods.toAuthJSON = function() {
  return {
    user: {
      name: this.name,
      role: this.role,
      _id: this._id,
      avatar: this.avatar,
    },
  }
}

export default mongoose.model('User', userSchema)
