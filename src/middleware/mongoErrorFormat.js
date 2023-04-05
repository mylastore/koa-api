const mongoErrorFormat = err => {
  let message = ''
  if (err.name === 'CastError') {
    message = `Invalid ${err.path}: ${err.value}`
  }
  if (err.code === 11000) {
    const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0]
    message = `${value} already exist. Please use another value!`
  }
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(el => el.message)
    message = `${errors[0]}`
  }
  if (
    err.name !== 'ValidationError' &&
    (err.message || err.message.length !== 0)
  ) {
    message = err.message
  }
  return message
}

export default mongoErrorFormat
