import Settings from '../models/Settings'

class SettingsController {
  async getSettings(ctx) {
    try {
      return ctx.body = await Settings.find()
    } catch (err) {
      ctx.throw(422, err)
    }
  }

  // When a newUser is created, send email to admin
  async updateSettings(ctx) {
    try {
      const {id, newUser} = ctx.request.body
      const obj = {
        newUser: newUser,
      }
      // if newUser setting exists
      if (id) {
        return ctx.body = await Settings.findByIdAndUpdate({_id: id}, obj,{new: true}).select({settings: 1})
      }
      // No newUser has been saved yet
      return ctx.body = await new Settings({obj}).save()
    } catch (err) {
      ctx.throw(422, err)
    }
  }
}

export default SettingsController
