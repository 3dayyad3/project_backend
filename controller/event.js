const RespondFormat = require('../respondFormat.js');
const Event = require('../model/event.js');
const Counter = require('../model/counter.js');

const getEvent = async (req, res) => {
  const eventData = await Event.find({});
  if (eventData.length === 0) {
    res.status(404).json(new RespondFormat(false, 'Event is empty'));
  }
  res.status(200).json(new RespondFormat(true, 'Events data found', eventData));
};

const getEventId = async (req, res) => {
  try {
    const id = new Number(req.params.id);
    const eventData = await Event.findOne({ id: id });
    if (eventData === null) {
      res
        .status(404)
        .json(new RespondFormat(false, `Event with id ${id} not found`));
    }
    res
      .status(200)
      .json(new RespondFormat(true, `Event with id ${id} found`, eventData));
  } catch (error) {
    res.status(400).json(new RespondFormat(false, error.message, []));
  }
};

const postEvent = async (req, res) => {
  try {
    console.log("Here")
    let eventCounter = await Counter.findOne({ name: 'event' });
    if (eventCounter === null) {
      const newCounter = new Counter({
        name: 'event',
      });
      eventCounter = await newCounter.save();
    }

    const startDate = new Date(req.body.start);
    const endDate = new Date(req.body.end);
    const currentDate = new Date();

    if (
      startDate.getTime() < currentDate.getTime() ||
      endDate.getTime() < currentDate.getTime()
    ) {
      res
        .status(400)
        .json(
          new RespondFormat(
            false,
            'the date of start or end cant be lesser than current date',
          ),
        );
    }

    if (startDate.getTime() >= endDate.getTime()) {
      res
        .status(400)
        .json(
          new RespondFormat(
            false,
            'the date of start or end cant be lesser than current date',
          ),
        );
    }

    eventCounter = await Counter.findOneAndUpdate(
      { name: 'event' },
      { seq: eventCounter.seq + 1 },
    );

    const newEvent = new Event({
      id: eventCounter.seq,
      description: new String(req.body.description).trim(),
      name: new String(req.body.name).trim(),
      start: startDate,
      end: endDate,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(new RespondFormat(true, 'data saved', [savedEvent]));
  } catch (error) {
    res.status(400).json(new RespondFormat(false, error.message));
  }
};

const putEvent = async (req, res) => {
  try {
  if (Object.keys(req.body).length === 0) {
    res.status(200).json(new RespondFormat(true, "Nothing to update"))
  }

  if (req.body.id === null || req.body.id === undefined) {
    res.status(400).json(new RespondFormat(false, "Require id"))
  }

  const isEventAvaible = await Event.findOne({id: req.body.id})
  if (isEventAvaible === null || isEventAvaible === undefined) {
    res.status(404).json(new RespondFormat(false, "No Event with id " + new String(req.body.id)))
  }

  let updatePart = {}
  if (req.body.name !== null || req.body.name !== undefined) {
    Object.assign(updatePart, {name: new String(req.body.name).trim()})
  }


  if (req.body.description !== null || req.body.description !== undefined) {
    Object.assign(updatePart, {name: new String(req.body.descriptionName).trim()})
  }


  if (req.body.start !== null || req.body.start !== undefined) {
    Object.assign(updatePart, {name: new Date(req.body.start)})
  }


  if (req.body.end !== null || req.body.end !== undefined) {
    Object.assign(updatePart, {name: new Date(req.body.end)})
  }


  if (Object.keys(updatePart).length === 0) {
    res.send(418).json(new RespondFormat(false, "All data error"))
  }

  const updated = await Event.findOneAndUpdate(
    { id: req.body.id },
    updatePart,
  );
  res
    .status(201)
    .json(
      new RespondFormat(true, 'data updated', [
        updated,
      ]),
    );
  } catch (error) {
    res.status(400).json(new RespondFormat(false, error.message))
  }
};

const deleteEvent = async (req, res) => {
  const deleted = await Event.deleteMany({});
  await Counter.findOneAndUpdate({ name: 'event' }, { seq: 0 });
  res
    .status(200)
    .json(new RespondFormat(true, `${deleted.deletedCount} data deleted`));
};

const deleteEventId = async (req, res) => {
  try {
    const id = new Number(req.params.id);
    const deleted = await Event.deleteOne({ id: id });
    res
      .status(200)
      .json(new RespondFormat(true, `${deleted.deletedCount} data deleted`));
  } catch (error) {
    res
      .status(404)
      .json(new RespondFormat(false, `${error.message} data deleted`));
  }
};

module.exports = {
  getEvent,
  getEventId,
  postEvent,
  putEvent,
  deleteEvent,
  deleteEventId,
};
