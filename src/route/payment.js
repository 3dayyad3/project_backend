const Payment = require("../model/payment.js")
const Counter = require("../model/counter.js")
const Ticket = require("../model/ticket.js")
const Stock = require("../model/stock.js")


module.exports = (app) => {
  app.get("/api/payment", async (req, res) => {
    res.status(200).json(await Payment.find({}))
  })

  app.get("/api/payment/:id", async (req, res) => {
    try {
      const id = new Number(req.params.id)
      res.status(200).json(await Payment.findOne({id: id}))
    }
    catch (error) {
      res.status(400).json(error)
    }
  })

  app.post("/api/payment", async (req, res) => {
    try {
      const refTicket = await Ticket.findOne({id: req.body.ref_ticket_id})
      if (refTicket === null) {
        res.status(404).json(`Ticket with id ${req.body.ref_ticket_id} not found`)
      }
      const refStock = await Stock.findOne({ref_event: refTicket.ref_event})
      if (refStock === null) {
        res.status(404).json(`ticket with id ${refTicket.id} have null stock`)
      }

      let counter = await Counter.findOne({name: "payment"})
      if (counter === null) {
        const newCounter = new Counter({name: "payment", seq: 0})
        await newCounter.save()
      }

      counter = await Counter.findOneAndUpdate({name: "payment"}, {seq: counter.seq + 1})
      const newPayment = new Payment({
        id: counter.seq,
        ref_ticket: refTicket._id
      })
      res.status(200).json(await newPayment.save())
    } catch (error) {
      res.status(400).json(error.message)
    }
  })

  app.put("/api/payment/pay/:id", async (req, res) => {
    try {
      const id = new Number(req.params.id)

      const paymentData = await Payment.findOneAndUpdate({id: id})
      const ticketData = await Ticket.findOne({_id: paymentData.ref_ticket})
      const stockData = await Stock.findOne({ref_event: ticketData.ref_event})
      const status = ticketData.status

      if (status === "vip") {
        if (stockData.amount.regular < ticketData.amount) {
          await Payment.findOneAndUpdate({id: id}, {status_payment: "fail"})
          res.status(400).send(`ticket not enough`)
        } else {
          const temp = stockData.amount.vip - ticketData.amount
          await Stock.findOneAndUpdate({ref_event: ticketData.ref_event}, {amount: {vip: temp}})
        }
      }
      if (status === "regular ") {
        if (stockData.amount.regular < ticketData.amount) {
          await Payment.findOneAndUpdate({id: id}, {status_payment: "fail"})
          res.status(400).send(`ticket not enough`)
        } else {
          const temp = stockData.amount.regular - ticketData.amount
          await Stock.findOneAndUpdate({ref_event: ticketData.ref_event}, {amount: {regular: temp}})
        }
      }

      const ticketPayed = await Payment.findOneAndUpdate({id: id}, {status_payment: "success"})
      res.status(200).json(ticketPayed)
    } catch (error) {
      res.status(400).json(error)
    }
  })

  app.put("/api/payment", async (req, res) => {
    const updated = await Payment.findOneAndUpdate({id: req.body.id}, {status_payment: req.body.status_payment})
    res.status(200).json(updated)
  })

  app.delete("/api/payment", async (req, res) => {
    const deleted = await Payment.deleteMany({})
    Counter.findOneAndUpdate({name: "payment"}, {seq: 0})
    res.status(200).json(deleted)
  })

  app.delete("/api/payment/:id", async (req, res) => {
    try {
      const id = new Number(req.params.id)
      const deleted = await Payment.deleteOne({id: id})
      const highestId = (await Ticket.find({}).sort({id:-1}).limit(1))[0]
      await Counter.findOneAndUpdate({name: "payment"}, {seq: highestId.id + 1})
      res.status(200).json(deleted)
    } catch (error) {
      res.status(404).json(error)
    }
  })
}
