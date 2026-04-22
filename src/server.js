const express = require("express")
const mongoose = require("mongoose")

const app = express()

const initServer = async () => {
  try {
    console.log("")

    const url = `mongodb://127.0.0.1:27017/project_backend`
    mongoose.connect(url)
    console.log(url)

    const port = 8080
    app.listen(port)
    console.log(`localhost:${port}`)

    console.log("")
  } catch (error) {
    console.log(error)
  }
}

app.use(express.json())

app.set("view engine", "ejs")
app.set("views", `${__dirname}/view`)

require("./route/user.js")(app)
require("./route/event.js")(app)
require("./route/ticket.js")(app)
require("./route/stock.js")(app)
require("./route/payment.js")(app)

initServer()
