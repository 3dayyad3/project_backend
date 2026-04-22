const Stock = require("../model/stock.js")
const Event = require("../model/event.js")

module.exports = (app) => {
  app.get("/api/stock", async (req, res) => {
    res.status(200).send(await Stock.find({}))
  })

  app.get("/api/stock/id/:id", async (req, res) => {
    try {
      const id = new Number(req.params.id)
      const refEvent = await Event.findOne({id: id})
      res.status(201).json(await Stock.findOne({ref_event: refEvent._id}))
    } catch (error) {
      res.status(404).json(error)
    }
  })

  app.post("/api/stock", async (req, res) => {
    try {
      const refEvent = await Event.findOne({id: req.body.ref_event_id})
      if (refEvent === null) {
        res.send(404).json(`${req.body.ref_event_id} is not found`)
      }

      const newStock = new Stock({
        ref_event: refEvent._id,
        amount: {
          vip: req.body.amount.vip,
          regular: req.body.amount.regular
        },
        price: {
          vip: req.body.price.vip,
          regular: req.body.price.regular
        }
      })
      const savedStock = await newStock.save()
      res.status(200).json(savedStock)
    } catch (error) {
      res.status(400).json(error.message)
    }
  })

  app.put("/api/stock", async (req, res) => {
    try {

      const eventRef = await Event.findOne({id: req.body.ref_event_id})
      if (eventRef === null) {
        res.status(404).json(`Stock with evennt id ${req.body.ref_event_id} not found`)
      }

      const newStock = await Stock.findOneAndUpdate({ref_event: eventRef._id},
        {
          amount: {
            vip: req.body.amount.vip,
            regular: req.body.amount.regular
          },
          price: {
            vip: req.body.price.vip,
            regular: req.body.price.regular
          }
        }
      )

      res.status(200).json(newStock)
    } catch (error) {
      res.status(404).json(error)
    }
  })

  app.delete("/api/stock", async (req, res) => {
    res.status(200).json(await Stock.deleteMany({}))
  })

  app.delete("/api/stock/id/:id", async (req, res) => {
    try {
      const id = new Number(req.params.id)
      const refEvent = await Event.findOne({id: id})
      res.status(200).send(await Stock.deleteOne({ref_event: refEvent._id}))
    } catch (error) {
      res.status.json(error)
    }
  })
}
