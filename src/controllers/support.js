import { sendSupportEmail, sendAuthorEmail } from '../middleware/utils'
import { validateEmail, validateRequired } from '../middleware/validate'

class SupportController {
    async contactAuthor(ctx) {
        const { email, authorEmail, name, message } = ctx.request.body

        try {
            const emailValid = validateEmail(email)
            const authorEmailValid = validateEmail(authorEmail)
            if (!emailValid || !authorEmailValid) {
                ctx.throw(422, 'Invalid email format')
            }
            const nameRequired = validateRequired(name)
            const messageRequired = validateRequired(message)
            if (!nameRequired || !messageRequired) {
                ctx.throw(422, 'Missing required data')
            }
            ctx.body = await sendAuthorEmail(ctx.request.body)
        } catch (err) {
            if (err.code === 401) {
                ctx.throw(
                    'Oops! something is not right. We are having issues sending your inquiry'
                )
            }
            ctx.throw(err.code || 422, err)
        }
    }

    async sendSupportEmail(ctx) {
        let { name, email, content } = ctx.request.body
        try {
            if (!name && !email && !content) {
                ctx.throw(422, 'Oops!, incomplete data')
            }
            return ctx.body = await sendSupportEmail(ctx.request.body)
        } catch (err) {
            console.log('errrrrrrrr ',err)
            if (err.code === 401) {
                ctx.throw(
                    'Oops! something is not right. We are having issues sending your inquiry'
                )
            }
            ctx.throw(err.code || 422, err)
        }
    }
}

export default SupportController
