import User from '../models/User'
import {
  accountActivationEmail, sendForgotPassword, gravatar, sendNewUserEmail, signJWT,
} from '../middleware/utils'
import jwt from 'jsonwebtoken'
import {notEmpty} from '../middleware/validate'
import mongoErrorFormat from "../middleware/mongoErrorFormat";

const isDev = process.env.NODE_ENV === 'development'
const currentDomain = isDev ? process.env.LOCAL_DOMAIN : process.env.LIVE_DOMAIN
const passwordResetSecrete = process.env.JWT_PASSWORD_SECRET
const userActivationSecret = process.env.JWT_ACCOUNT_ACTIVATION

/**
 * User controller - Class
 * @category Api
 */
class UserController {
  // prepare email verification token
  async accountActivation(ctx) {
    const {name, email, password, passwordConfirmation} = ctx.request.body

    const emailValid = notEmpty(email)
    const passwordValid = notEmpty(password)
    const nameValid = notEmpty(name)

    if (!emailValid || !passwordValid || !nameValid) {
      ctx.throw(422, 'Invalid data received. Please review our requirements')
    }

    if (password !== passwordConfirmation) {
      ctx.throw(422, 'Password & Confirmation Password does not match.')
    }

    const userData = {name, email, password}

    try {
      await User.validate(userData)

      const user = await User.exists({email})

      if (user) {
        ctx.throw(422, 'An active account already exist.')
      }

      const token = await jwt.sign({name, email, password}, userActivationSecret, {expiresIn: '15m'})
      ctx.body = {
        status: 200, message: `An email has been sent to ${email}. Please validate to activate account.`,
      }
      return await accountActivationEmail(email, token)
    } catch (err) {
      ctx.throw(422, mongoErrorFormat(err))
    }
  }

  // Complete the registration and notify admin of new user
  async register(ctx) {
    const {token} = ctx.request.body
    await jwt.verify(token, userActivationSecret, async function (err, decoded) {
      if (err) {
        ctx.throw(401, {
          message: 'Link is expired. Please signup again.',
        })
      }
      const {name, email, password} = decoded
      const avatar = gravatar(email)
      const obj = {
        name, email, password, avatar, emailVerificationToken: undefined, emailVerified: true,
      }
      const user = new User(obj)

      try {
        const result = await user.save()
        if (result) {
          // Notify owner when a user registers
          await sendNewUserEmail(name, email)
          ctx.body = {
            status: 200, message: 'Account is now active. Please login.',
          }
        }
      } catch (err) {
        ctx.throw(422, mongoErrorFormat(err))
      }
    })
  }

  async login(ctx) {
    const {password, email} = ctx.request.body

    if (!notEmpty(password)|| !notEmpty(email)) {
      ctx.throw(422, 'Invalid data received.')
    }
    const userData = { password, email }
    try {
      // validate email & password requirements
      await User.validate(userData)

      // we need the user data
      let user = await User.findOne({email: email})
      if (!user) {
        ctx.throw(404, 'User not found.')
      }

      if (!(await user.comparePassword(password))) {
        ctx.throw(422, {message: 'Password or email is incorrect.'})
      }

      const session = {
        userId: user._id, valid: true, name: user.name, role: user.role,
      }
      //create or update the userSession
      const res = await User.findOneAndUpdate({email}, {$set: {userSession: session}}, {new: true})

      if (res) {
        // create access token and set it in a secure cookie
        const token = signJWT({
          userSession: {
            userId: user._id, name: user.name, role: user.role,
          },
        }, '5s')

        ctx.cookies.set('token', token, {
          domain: currentDomain,
          maxAge: 300000, // 5 minutes
          httpOnly: true,
          secure: true,
        })

        const refreshToken = signJWT({userId: user._id}, '1y')
        ctx.cookies.set('refreshToken', refreshToken, {
          domain: currentDomain,
          maxAge: 3.154e10, // 1 year
          httpOnly: true,
          secure: true,
        })

        const userData = {
          userId: user._id,
          role: user.role,
          name: user.name,
          avatar: user.avatar,
        }

        ctx.cookies.set('user', JSON.stringify(userData), {
          domain: currentDomain,
          maxAge: 2 * 60 * 60 * 1000, // 2 hrs
          secure: true,
          httpOnly: true,
        })

        ctx.state.user = userData
        return ctx.body = {user: userData}
      }
    } catch (err) {
      ctx.throw(422, mongoErrorFormat(err))
    }
  }

  async logOut(ctx) {
    try {
      const res = await User.findOneAndUpdate({_id: ctx.request.body.id}, {$set: {'userSession.valid': false}})
      if (res) {
        ctx.cookies.set('token', null, {domain: currentDomain, maxAge: 0})
        ctx.cookies.set('user', null, {domain: currentDomain, maxAge: 0})
        ctx.cookies.set('refreshToken', null, {
          domain: currentDomain, maxAge: 0,
        })
        ctx.state.user = null
        return (ctx.body = {
          status: 200, message: 'Success!',
        })
      }
    } catch (err) {
      ctx.throw(422, mongoErrorFormat(err))
    }
  }

  async forgot(ctx) {
    const {email} = ctx.request.body
    const emailValid = !notEmpty(email)

    if (!emailValid) {
      ctx.throw(422, 'Invalid data received.')
    }

    try {
      const exist = await User.exists({email: email})
      // If the email does not exist, we send a generic message. No further action is taken.
      if (!exist) {
        ctx.throw(200, 'If an account is found, you will receive an email with reset password instructions.')
      }

      const token = jwt.sign({}, passwordResetSecrete, {
        expiresIn: '30m',
      })
      let resetData = {
        passwordResetToken: token,
      }
      const user = await User.findOneAndUpdate({email: email}, resetData, {returnOriginal: false})

      await sendForgotPassword(user.email, token)
      ctx.body = {status: 200, message: `Email sent to ${user.email}`}

    } catch (err) {
      ctx.throw(422, mongoErrorFormat(err))
    }
  }

  async resetPassword(ctx) {
    const {passwordResetToken, password} = ctx.request.body
    const passwordValid = !notEmpty(password)
    if (!passwordValid) {
      ctx.throw(422, 'Password is required.')
    }

    await jwt.verify(passwordResetToken, passwordResetSecrete, async function (err) {
      if (err) {
        ctx.throw(401, 'Expired or invalid link! Please try resetting your password again')
      }
      try {
        let user = await User.findOne({
          passwordResetToken: passwordResetToken,
        })
        if (!user) {
          ctx.throw(422, 'Password reset token is invalid or has expired.')
        }
        user.password = password
        user.passwordResetToken = undefined

        const res = await user.save()
        if (res) {
          ctx.body = {
            status: 200, message: 'Password was updated successfully.',
          }
        }
      } catch (err) {
        ctx.throw(422, mongoErrorFormat(err))
      }
    })
  }

  async updatePassword(ctx) {
    const {_id, password} = ctx.request.body
    try {
      const user = await User.findOne({_id: _id})
      if (user) {
        user.password = password
        const res = await user.save()
        if (!res) {
          ctx.throw(422, 'Oops something went wrong, please try again.')
        }
        ctx.body = {status: 200, message: 'Password was updated.'}
      }
    } catch (err) {
      ctx.throw(422, mongoErrorFormat(err))
    }
  }

  async getProfile(ctx) {
    const {_id} = ctx.request.body
    try {
      return (ctx.body = await User.findOne({_id: _id}).select('name email about website role location gender avatar createdAt _id'))
    } catch (err) {
      ctx.throw(422, mongoErrorFormat(err))
    }
  }

  async updateAccount(ctx) {
    const {
      _id, about, website, location, gender, name, email,
    } = ctx.request.body
    // we do not allow name or email updates.
    if (name || email) ctx.throw(422, 'Invalid request received.')

    const userObject = {
      about, location, website, gender
    }

    try {
      let user = await User.findOneAndUpdate({_id: _id}, userObject, {
        new: true, runValidators: true, context: 'query',
      })
      if (!user) {
        ctx.throw(404, 'User not found')
      }
      ctx.body = user.toAuthJSON()
    } catch (err) {
      ctx.throw(422, mongoErrorFormat(err))
    }
  }

  async deleteUser(ctx) {
    try {
      const userId = ctx.request.body._id
      const deleteUser = await User.deleteOne({_id: userId})
      if (deleteUser) {
        ctx.cookies.set('token', null, {domain: currentDomain})
        ctx.cookies.set('refreshToken', null, {domain: currentDomain})
        ctx.cookies.set('user', null, {domain: currentDomain})
        ctx.state.user = null
        ctx.body = {status: 200, message: 'Success!'}
      }
    } catch (err) {
      ctx.throw(422, mongoErrorFormat(err))
    }
  }

  // ADMIN USER CONTROLLER
  async adminGetUsers(ctx) {
    const perPage = 2
    const page = ctx.params.page || 1
    try {
      const users = await User.find({})
        .select('name gender website location createdAt avatar role')
        .skip(perPage * page - perPage)
        .limit(perPage)
      const totalItems = await User.countDocuments({})
      return (ctx.body = {
        totalItems: totalItems, perPage: perPage, users: users,
      })
    } catch (err) {
      ctx.throw(422, mongoErrorFormat(err))
    }
  }

  async adminGetUser(ctx) {
    try {
      return (ctx.body = await User.findById({
        _id: ctx.params.id,
      }).select({
        profile: 1, role: 1, avatar: 1, createdAt: 1, about: 1, name: 1,
      }))
    } catch (err) {
      ctx.throw(422, mongoErrorFormat(err))
    }
  }

  async getStats(ctx) {
    try {
      return (ctx.body = await User.countDocuments({}))
    } catch (err) {
      ctx.throw(422, mongoErrorFormat(err))
    }
  }

  // public user
  async publicProfile(ctx) {
    try {
      const user = await User.findOne({
        _id: ctx.params.id,
      }).select('_id name email avatar createdAt')

      const blogs = await Blog.find({postedBy: user._id})
        .populate('categories', 'name slug')
        .populate('tags', 'name slug')
        .populate('postedBy', 'id name')
        .select('title slug excerpt categories avatar tags postedBy createdAt')

      return (ctx.body = {user, blogs})
    } catch (err) {
      ctx.throw(422, mongoErrorFormat(err))
    }
  }
}

export default UserController
