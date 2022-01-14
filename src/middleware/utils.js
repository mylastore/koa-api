import crypto from 'crypto'
import sendGridMail from '@sendgrid/mail'

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY)

const requestHost =
  process.env.NODE_ENV === 'development'
    ? process.env.DEV_HOST
    : process.env.PRODUCTION_HOST

//sendgrid templates
const bookingTemplate = process.env.SENDGRID_BOOKING
const supportTemplate = process.env.SENDGRID_SUPPORT

//sendgrid
const appEmail = process.env.APP_EMAIL
const appSecondEmail = process.env.APP_SECOND_EMAIL
const appName = process.env.APP_NAME

export async function newAppointment(data) {
  const payload = {
    from: appEmail,
    to: [appEmail],
    subject: `Booking Request @ ${appName}`,
    template_id: bookingTemplate,
    dynamic_template_data: {
      name: data.name,
      email: data.email,
      address: data.address,
      phone: data.phone,
      additionalInfo: data.additionalInfo,
      bookingDay: data.bookingDay,
      time: data.time,
    },
  }
  try {
    return await sendGridMail.send(payload)
  } catch (e) {
    return e
  }
}

export async function accountActivationEmail(email, token) {
  const link = `${requestHost}/user/activation/${token}`
  const payload = {
    to: email,
    from: appEmail,
    subject: 'Account Activation',
    html: `
            <strong>Welcome to  ${appName}.<br/><br/> Please click on the button below to activate your account. If you did not request this, please ignore this email.<br/><br/></strong>
            <a href="${link}">ACCOUNT ACTIVATION LINK</a>
          `,
  }
  try {
    return await sendGridMail.send(payload)
  } catch (e) {
    return e
  }
}

export async function sendForgotPassword(email, token) {
  const link = `${requestHost}/user/reset/${token}`
  const payload = {
    to: email,
    from: appEmail, // Change to your verified sender
    subject: 'Password reset link',
    html: `
            <strong>You are receiving this email because you (or someone else) have requested the reset of the password for your account @${appName}.<br/><br/> Please click on the button below to complete the process. If you did not request this, please ignore this email and your password will remain unchanged.<br/><br/></strong>
            <a href="${link}">PASSWORD RESET LINK</a>
          `,
  }
  try {
    return await sendGridMail.send(payload)
  } catch (e) {
    return e
  }
}

export async function sendNewUserEmail(name, email) {
  const msg = {
    to: appEmail,
    from: appEmail, // Change to your verified sender
    subject: `New user created @${appName}`,
    html: `
            <strong>New user was created @${appName}<br/></strong><br/>
            <p>${name}</p>    
            <p>${email}</p>    
          `,
  }
  try {
    return await sendGridMail.send(msg)
  } catch (e) {
    return e
  }
}

export async function sendSupportEmail(data) {
  let {name, email, message, phone} = data

  const payload = {
    to: [appEmail],
    from: appEmail,
    subject: `Support from ${appName}`,
    template_id: supportTemplate,
    dynamic_template_data: {
      name: name,
      email: email,
      phone: phone,
      message: message,
      appUrl: requestHost,
      appName: appName,
    },
  }
  try {
    return await sendGridMail.send(payload)
  } catch (e) {
    return e
  }
}

export async function sendAuthorEmail(data) {
  let {name, email, message, authorEmail} = data
  const emailList = [authorEmail]

  const payload = {
    to: emailList,
    from: email,
    subject: `Someone message you from ${appName}`,
    text: `Message received from:  \n Name: ${name} \n Email: ${email} \n Message: ${message}`,
    template_id: 'd-db32c2ca9cf94a47ac47f403a7778db2',
    dynamic_template_data: {
      name: name,
      email: email,
      message: message,
      appUrl: requestHost,
      appName: appName,
    },
  }
  try {
    return await sendGridMail.send(payload)
  } catch (e) {
    return e
  }
}

export function gravatar(email) {
  const size = 200
  if (!email) return `https://gravatar.com/avatar/?s=${size}&d-mp`
  const md5 = crypto
    .createHash('md5')
    .update(email)
    .digest('hex')
  return `https://gravatar.com/avatar/${md5}?S=${size}&d=mp`
}

export function parseJsonToObject(str) {
  try {
    return JSON.parse(str)
  } catch (error) {
    return {}
  }
}

export function generateID(strLength) {
  // Create a string of random alphanumeric characters, of a given length
  strLength =
    typeof strLength === 'number' && strLength > 0 ? strLength : false
  if (strLength) {
    // Define all the possible characters that could go into a string
    const possibleCharacters =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

    // Start the final string
    let str = ''
    for (var i = 1; i <= strLength; i++) {
      // Get a random characters from the possibleCharacters string
      let randomCharacter = possibleCharacters.charAt(
        Math.floor(Math.random() * possibleCharacters.length)
      )
      // Append this character to the string
      str += randomCharacter
    }
    // Return the final string
    return str
  } else {
    return false
  }
}
