const Event = require("../model/event.js")
const Counter = require("../model/counter.js")

module.exports = (app) => {
  app.get("/api/event", async (req, res) => {
    const eventData = await Event.find({})
    res.status(200).json(eventData)
  })

  app.get("/api/event/id/:id", async (req, res) => {
    try {
      const id = new Number(req.params.id)
      const eventData = await Event.findOneAndUpdate({id: id}, {})
      res.status(200).json(eventData)
    } catch (error) {
      res.status(400).json(error)
    }
  })

  app.post("/api/event", async (req, res) => {
    try {

      let eventCounter = await Counter.findOne({name: "event"})
      if (eventCounter === null) {
        const newCounter = new Counter({
          name: "event"
        })
        eventCounter = await newCounter.save()
      }

      const startDate = new Date(req.body.start)
      const endDate = new Date(req.body.end)
      const currentDate = new Date()

      if (startDate.getTime() < currentDate.getTime() || endDate.getTime() < currentDate.getTime()) {
        res.status(400).json("the date of start or end cant be lesser than current date")
      }

      if (startDate.getTime() >= endDate.getTime()) {
        res.status(400).json("the date of start cant be bigger or equal to current date")
      }

      eventCounter = await Counter.findOneAndUpdate({name: "event"}, {seq: eventCounter.seq + 1})
      const newEvent = new Event ({
        id: eventCounter.seq,
        description: new String(req.body.description).trim(),
        start: startDate,
        end: endDate,
      })

      const savedEvent = await newEvent.save()
      res.status(201).json(savedEvent)
    } catch (error) {
      res.status(400).json(error)
    }
  })

  app.put("/api/event", async (req, res) => {
    const updatedEvent = await Event.findOneAndUpdate({id: req.body.id}, {start: req.body.start, end: req.body.end, description: req.body.description})
    res.status(201).json(`updated`)
  })

  app.delete("/api/event", async (req, res) => {
    const deleted = await Event.deleteMany({})
    await Counter.findOneAndUpdate({name: "event"}, {seq: 0})
    res.status(200).json(deleted)
  })

  app.delete("/api/event/id/:id", async (req, res) => {
    try {
      const id = new Number(req.params.id)
      const deleted = await Event.deleteOne({id:id})
      const highestId = await Event.find({}).sort({id:-1}).limit(1)
      await Counter.findOneAndUpdate({name: "event"}, {seq: highestId[0].id + 1})
      res.status(200).json(deleted)
    } catch (error) {
      res.status(404).json(error)
    }
  })
}
