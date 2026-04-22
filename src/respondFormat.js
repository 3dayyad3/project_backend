class RespondFormat {
  constructor(success = false, message = "", data = []) {
    this.success = success
    this.message = new String(message).trim()
    this.data = data
  }
}

module.exports = RespondFormat
