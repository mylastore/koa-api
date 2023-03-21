import User from '../models/User'
import {
  accountActivationEmail,
  sendForgotPassword,
  gravatar,
  sendNewUserEmail,
  signJWT,
} from '../middleware/utils'
import mongoError from '../middleware/mongoErrors'
import jwt from 'jsonwebtoken'
import {
  validateEmail,
  validatePassword,
  validateRequired,
} from '../middleware/validate'

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
    const {name, email, password} = ctx.request.body
    const emailValid = validateRequired(email)
    const passwordValid = validateRequired(password)
    const nameValid = validateRequired(name)

    if (!emailValid || !passwordValid || !nameValid) {
      ctx.throw(422, 'Invalid data received')
    }

    try {
      const user = await User.exists({email})
      if (user) {
        ctx.throw(422, 'An active account already exist.')
      }
      const token = await jwt.sign(
        {name, email, password},
        userActivationSecret,
        {expiresIn: '60m'}
      )
      ctx.body = {
        status: 200,
        message: `An email has been sent to ${email}. Please validate to activate account.`,
      }
      return await accountActivationEmail(email, token)
    } catch (err) {
      ctx.throw(422, err)
    }
  }

  // Complete the registration and notify admin of new user
  async register(ctx) {
    const {token} = ctx.request.body
    await jwt.verify(token, userActivationSecret, async function (
      err,
      decoded
    ) {
      if (err) {
        ctx.throw(401, {
          message: 'Link is expired. Please signup again.',
        })
      }
      const {name, email, password} = decoded
      const avatar = gravatar(email)
      const obj = {
        name,
        email,
        password,
        avatar,
        emailVerificationToken: undefined,
        emailVerified: true,
      }
      const user = new User(obj)

      try {
        const result = await user.save()
        if (result) {
          // Notify owner when a user registers
          await sendNewUserEmail(name, email)
          ctx.body = {
            status: 200,
            message: 'Account is now active. Please login.',
          }
        }
      } catch (err) {
        ctx.throw(422, err)
      }
    })
  }

  async login(ctx) {
    const {password, email} = ctx.request.body

    try {
      let user = await User.findOne({email: email})

      const isPassword = validateRequired(password)
      const isEmail = validateRequired(email)

      if(!isPassword || !isEmail) return ctx.throw(422, 'Email & password is required.')

      if (password && !(await user.comparePassword(password))) {
        ctx.throw(422, {message: 'Invalid data received.'})
      }

      const session = {
        userId: user._id,
        valid: true,
        name: user.name,
        role: user.role,
      }
      //create or update the userSession
      const res = await User.findOneAndUpdate(
        {email},
        {$set: {userSession: session}}
      )
      if (res) {
        // create access token and set it in a secure cookie
        const token = signJWT(
          {
            userSession: {
              userId: user._id,
              name: user.name,
              role: user.role,
            },
          },
          '60s'
        )
        ctx.cookies.set('token', token, {
          domain: currentDomain,
          maxAge: 900000, // 15 minutes
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
          avatar: user.avatar
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
    } catch (error) {
      ctx.throw(422, error)
    }
  }

  async logOut(ctx) {
    try {
      const res = await User.findOneAndUpdate(
        {_id: ctx.request.body.id},
        {$set: {'userSession.valid': false}}
      )
      if(res){
        ctx.cookies.set('token', null, {domain: currentDomain, maxAge: 0})
        ctx.cookies.set('user', null, {domain: currentDomain, maxAge: 0})
        ctx.cookies.set('refreshToken', null, {domain: currentDomain, maxAge: 0 })
        ctx.state.user = null
        return ctx.body = {
          status: 200,
          message: 'Success!',
        }
      }
    } catch (err) {
      ctx.throw(422, err)
    }
  }

  async forgot(ctx) {
    const data = ctx.request.body
    const emailValid = validateEmail(data.email)
    if (!emailValid || !data.email) {
      ctx.throw(422, 'Email format is invalid')
    }
    const exist = await User.exists({email: data.email})
    // If the email does not exist, we send a generic message. No further action is taken.
    if (!exist) {
      ctx.throw(200, {
        message:
          'If an account is found, you will receive an email with reset password instructions.',
      })
    }

    try {
      const token = jwt.sign({}, passwordResetSecrete, {
        expiresIn: '30m',
      })
      let resetData = {
        passwordResetToken: token,
      }
      const user = await User.findOneAndUpdate(
        {email: data.email},
        resetData,
        {returnOriginal: false}
      )
      if (!user) {
        ctx.throw(422, 'Email not found.')
      }

      await sendForgotPassword(user.email, token)
      ctx.body = {status: 200, message: `Email sent to ${user.email}`}
    } catch (err) {
      if (err.code === 401) {
        ctx.throw(
          'Oops! something is not right. We are having issues sending your inquiry'
        )
      }
      ctx.throw(err.code || 422, err)
    }
  }

  async resetPassword(ctx) {
    const {passwordResetToken, password} = ctx.request.body
    const passwordValid = validateRequired(password)
    if (!passwordValid) {  ctx.throw( 422, 'Password is required.' ) }

    await jwt.verify(
      passwordResetToken,
      passwordResetSecrete,
      async function (err) {
        if (err) {
          ctx.throw(
            401,
            'Expired or invalid link! Please try resetting your password again'
          )
        }
        try {
          let user = await User.findOne({
            passwordResetToken: passwordResetToken,
          })
          if (!user) {
            ctx.throw(
              422,
              'Password reset token is invalid or has expired.'
            )
          }
          user.password = password
          user.passwordResetToken = undefined

          const res = await user.save()
          if (res) {
            ctx.body = {
              status: 200,
              message: 'Password was updated successfully.',
            }
          }
        } catch (err) {
          ctx.throw(422, err)
        }
      }
    )
  }

  async updatePassword(ctx) {
    const {_id, password} = ctx.request.body
    try {
      const user = await User.findOne({_id: _id})
      if (user) {
        user.password = password
        const res = await user.save()
        if (!res) {
          ctx.throw(
            422,
            'Oops something went wrong, please try again.'
          )
        }
        ctx.body = {status: 200, message: 'Password was updated.'}
      }
    } catch (err) {
      ctx.throw(422, mongoError(err))
    }
  }

  async getProfile(ctx) {
    const {_id} = ctx.request.body
    try {
      return ctx.body = await User.findOne({_id: _id}).select(
        'name email about website role location gender avatar createdAt _id'
      )
    } catch (err) {
      ctx.throw(422, err)
    }
  }

  async updateAccount(ctx) {
    const { _id, about, website, location, gender, name } = ctx.request.body
    const userObject = { about, website, location, gender, name }

    try {
      let user = await User.findOneAndUpdate(
        {_id: _id},
        userObject,
        {
          new: true,
          runValidators: true,
          context: 'query',
        }
      )
      if (!user) {
        ctx.throw(404, 'User not found')
      }
      ctx.body = user.toAuthJSON()
    } catch (err) {
      ctx.throw(422, err)
    }
  }

  async deleteUser(ctx) {
    try {
      const userId = ctx.request.body._id
      const deleteUser = await User.deleteOne({_id: userId})
      if (deleteUser) {
        ctx.cookies.set('token', null, {domain: currentDomain})
        ctx.cookies.set('refreshToken', null, {domain: currentDomain})
        ctx.cookies.set('user', null, { domain: currentDomain })
        ctx.state.user = null
        ctx.body = {status: 200, message: 'Success!'}
      }
    } catch (err) {
      ctx.throw(422, err)
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
        totalItems: totalItems,
        perPage: perPage,
        users: users,
      })
    } catch (err) {
      ctx.throw(422, err)
    }
  }

  async adminGetUser(ctx) {
    try {
      return (ctx.body = await User.findById({
        _id: ctx.params.id,
      }).select({
        profile: 1,
        role: 1,
        avatar: 1,
        createdAt: 1,
        about: 1,
        name: 1,
      }))
    } catch (err) {
      ctx.throw(err)
    }
  }

  async getStats(ctx) {
    try {
      return (ctx.body = await User.countDocuments({}))
    } catch (err) {
      ctx.throw(422, err)
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
        .select(
          'title slug excerpt categories avatar tags postedBy createdAt'
        )

      return (ctx.body = {user, blogs})
    } catch (err) {
      ctx.throw(422, err)
    }
  }
}

export default UserController
