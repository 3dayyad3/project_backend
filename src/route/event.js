const Event = require("../model/event.js")
const Counter = require("../model/counter.js")
const RespondFormat = require("../respondFormat.js")

module.exports = (app) => {
  app.get("/api/event", async (req, res) => {
    const eventData = await Event.find({})
    if (eventData.length === 0) {
      res.status(404).json(new RespondFormat(false, "Event is empty"))
    }
    res.status(200).json(new RespondFormat(true, "Events data found", eventData))
  })

  app.get("/api/event/id/:id", async (req, res) => {
    try {
      const id = new Number(req.params.id)
      const eventData = await Event.findOne({id: id})
      if (eventData === null) {
        res.status(404).json(new RespondFormat(false, `Event with id ${id} not found`))
      }
      res.status(200).json(new RespondFormat(true, `Event with id ${id} found`, eventData))
    } catch (error) {
      res.status(400).json(new RespondFormat(false, error.message, []))
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
        res.status(400).json(new RespondFormat(false, "the date of start or end cant be lesser than current date"))
      }

      if (startDate.getTime() >= endDate.getTime()) {
        res.status(400).json(new RespondFormat(false, "the date of start or end cant be lesser than current date"))
      }

      eventCounter = await Counter.findOneAndUpdate({name: "event"}, {seq: eventCounter.seq + 1})
      const newEvent = new Event ({
        id: eventCounter.seq,
        description: new String(req.body.description).trim(),
        start: startDate,
        end: endDate,
      })

      const savedEvent = await newEvent.save()
      res.status(201).json(new RespondFormat(true, "data saved",  [savedEvent]))
    } catch (error) {
      res.status(400).json(new RespondFormat(false,  error.message))
    }
  })

  app.put("/api/event", async (req, res) => {
    await Event.findOneAndUpdate({id: req.body.id}, {start: req.body.start, end: req.body.end, description: req.body.description})
    res.status(201).json(new RespondFormat(true, "data updated", [await Event.findOne({id: req.body.id})]))
  })

  app.delete("/api/event", async (req, res) => {
    const deleted = await Event.deleteMany({})
    await Counter.findOneAndUpdate({name: "event"}, {seq: 0})
    res.status(200).json(new RespondFormat(true, `${deleted.deletedCount} data deleted`))
  })

  app.delete("/api/event/id/:id", async (req, res) => {
    try {
      const id = new Number(req.params.id)
      const deleted = await Event.deleteOne({id:id})
      res.status(200).json(new RespondFormat(true, `${deleted.deletedCount} data deleted`))
    } catch (error) {
      res.status(404).json(new RespondFormat(false, `${error.message} data deleted`))
    }
  })
}
