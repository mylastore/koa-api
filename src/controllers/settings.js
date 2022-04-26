import Settings from '../models/Settings'

class SettingsController {
    async getSettings(ctx) {
        try {
            return (ctx.body = await Settings.find())
        } catch (err) {
            ctx.throw(422, err)
        }
    }

    // We will use this newUser (notification setting) to send email to admin when new users are created
    async updateSettings(ctx) {
        try {
            const body = ctx.request.body
            const obj = {
                newUser: body.newUser,
            }
            // run this when there is already a newUser saved.
            if (body.id) {
                return (ctx.body = await Settings.findByIdAndUpdate(
                    { _id: body.id },
                    obj,
                    {
                        new: true,
                    }
                ).select({ settings: 1 }))
            }
            // if no newUser has been saved we run this
            return (ctx.body = await new Settings({ obj }).save())
        } catch (err) {
            ctx.throw(422, err)
        }
    }
}

export default SettingsController
