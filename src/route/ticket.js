const Ticket = require("../model/ticket.js")
const Counter = require("../model/counter.js")
const Stock = require("../model/stock.js")
const User = require("../model/user.js")
const Event = require("../model/event.js")

module.exports = (app) => {
  app.get("/api/ticket", async (req, res) => {
    const ticketData = await Ticket.find({})
    res.status(200).json(ticketData)
  })

  app.get("/api/ticket/:id", async (req, res) => {
    try {
      const id = new Number(req.params.id)
      const ticketData = await Ticket.findOne({id: id})
      if (ticketData === null) {
        res.status(404).json("ticket data not found")
      }
      res.status(200).json(ticketData)
    } catch (error) {
      res.status(400).json(error)
    }
  })

  app.post("/api/ticket", async (req, res) => {
    try {
      const refEvent = await Event.findOne({id: req.body.ref_event_id})
      const refUser = await User.findOne({email: req.body.ref_user_email})

      if (refEvent === null || refUser === null) {
        const temp = {ref_user_email: refUser, ref_event_id: refEvent}
        let result = ""
        Object.entries(temp).forEach(([key, value]) => {
          if (value === null) {
            result += `${key} not Found. `
          }})
          res.status(404).json(result)
      }

      const stock = await Stock.findOne({ref_event: refEvent._id})
      if (stock === null) {
        res.status(404).json(`Event doesnt have a stock`)
      }


      if (req.body.status === "vip") {
        if (stock.amount.vip < req.body.amount) {
          res.status(404).json(`Event doesnt have enought vip ticket`)
        }
      }

      if (req.body.status === "regular") {
        if (stock.amount.regular < req.body.amount) {
          res.status(404).json(`Event doesnt have enought regular ticket`)
        }
      }

      let ticketCounter = await Counter.findOne({name: "ticket"})
      if (ticketCounter === null) {
        const newTicketCounter = new Counter({name: "ticket"})
        ticketCounter = await newTicketCounter.save()
      }

      ticketCounter = await Counter.findOneAndUpdate({name: "ticket"}, {seq: ticketCounter.seq + 1})
      let newTicket = new Ticket ({
        id: ticketCounter.seq,
        ref_event: refEvent._id,
        ref_user: refUser._id,
        amount: req.body.amount,
        status: req.body.status
      })

      if (newTicket.status === "vip") {
        newTicket.total = newTicket.amount * stock.price.vip
      }

      if (newTicket.status === "regular") {
        newTicket.total = newTicket.amount * stock.price.regular
      }

      const savedTicket =  await newTicket.save()
      res.status(201).json(savedTicket)
    } catch (error) {
      res.status(400).json(error)
    }
  })

  app.put("/api/ticket", async (req, res) => {
    await Ticket.findOneAndUpdate({id: req.body.id}, {amount: req.body.amount, status: req.body.status})
    const ticket = await Ticket.findOne({id: req.body.id})
    const stock = await Stock.findOne({ref_event: ticket.ref_event})
    if (ticket.status === "vip") {
      ticket.total = ticket.amount * stock.price.vip
    } else {
      ticket.total = ticket.amount * stock.price.regular
    }
    await Ticket.findOneAndUpdate({id: req.body.id}, {total: ticket.total})
    res.status(201).json("update")
  })

  app.delete("/api/ticket", async (req, res) => {
    const deleted = await Ticket.deleteMany({})
    Counter.findOneAndUpdate({name: "ticket"}, {seq: 0})
    res.status(200).json(deleted)
  })

  app.delete("/api/ticket/id/:id", async (req, res) => {
    const deleted = await Ticket.deleteOne({id: req.params.id})
    const highestId = (await Ticket.find({}).sort({id:-1}).limit(1))[0]
    await Counter.findOneAndUpdate({name: "ticket"}, {seq: highestId.id + 1})
    res.status(200).json(deleted)
  })
}
