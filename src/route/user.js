const User = require("../model/user.js")

module.exports = (app) => {
  app.get("/api/user", async (req, res) => {
    const userData = await User.find({})
    res.status(200).json(userData)
  })

  app.get("/api/user/email/:email", async (req, res) => {
    const userData = await User.findOne({email: req.params.email})
    res.status(200).json(userData)
  })

  app.get("/api/user/name/:name", async (req, res) => {
    const userData = await User.find({name: req.params.name.trim()})
    res.status(200).json(userData)
  })

  app.post("/api/user", async (req, res) => {
    try {
      const newUser = new User ({
        name: new String(req.body.name).trim(),
        email: new String(req.body.email).trim(),
        password: new String(req.body.password).trim()
      })
      const savedUser = await newUser.save()
      res.status(201).json(savedUser)
    } catch (error) {
      res.status(400).json(error)
    }
  })

  app.put("/api/user", async (req, res) => {
    try {
      const updatedUser = await User.findOneAndUpdate({email: req.body.email}, {name: req.body.name, password: req.body.password})
      if (updatedUser === null) {
        res.status(404).json(`user with email ${req.body.email} not found`)
      }
      res.json(`updated`)
    } catch (error) {
      res.json(error)
    }
  })

  app.delete("/api/user", async (req, res) => {
    const deleted = await User.deleteMany({})
    res.status(200).json(deleted)
  })

  app.delete("/api/user/name/:name", async (req, res) => {
    const deleted = await User.deleteMany({name: req.params.name.trim()})
    res.status(200).json(deleted)
  })

  app.delete("/api/user/name", async (req, res) => {
    const deleted = await User.deleteMany({name: ""})
    res.status(200).json(deleted)
  })

  app.delete("/api/user/email/:email", async (req, res) => {
    const deleted = await User.deleteMany({email: req.params.email.trim()})
    res.status(200).json(deleted)
  })
  }
