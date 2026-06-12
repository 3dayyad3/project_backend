const User = require('../model/user.js');
const RespondFormat = require('../respondFormat.js');

module.exports = (app) => {
  app.get('/api/user', async (req, res) => {
    const userData = await User.find({});
    if (userData.length === 0) {
      res.status(404).json(new RespondFormat(false, 'Users data not found'));
    }
    res.status(200).json(new RespondFormat(true, 'User Data found', userData));
  });

  app.get('/api/user/email/:email', async (req, res) => {
    const userData = await User.findOne({ email: req.params.email });
    if (userData === null) {
      res
        .status(404)
        .json(
          new RespondFormat(
            false,
            `Users data with email ${req.params.email} not found`,
          ),
        );
    }
    res
      .status(200)
      .json(
        new RespondFormat(
          true,
          `Users data with email ${req.params.email} found`,
          [userData],
        ),
      );
  });

  app.get('/api/user/name/:name', async (req, res) => {
    const userData = await User.find({ name: req.params.name.trim() });
    if (userData.length === 0) {
      res
        .status(404)
        .json(
          new RespondFormat(
            false,
            `Users data with name ${req.params.name} not found`,
          ),
        );
    }
    res
      .status(200)
      .json(
        new RespondFormat(
          true,
          `Users data with name ${req.params.name} found`,
          userData,
        ),
      );
  });

  app.post('/api/user', async (req, res) => {
    try {
      const newUser = new User({
        name: new String(req.body.name).trim(),
        email: new String(req.body.email).trim(),
        password: new String(req.body.password).trim(),
      });
      const savedUser = await newUser.save();
      res
        .status(201)
        .json(new RespondFormat(true, 'Data is saved', [savedUser]));
    } catch (error) {
      res.status(400).json(new RespondFormat(false, error.message));
    }
  });

  app.put('/api/user', async (req, res) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { email: req.body.email },
        { name: req.body.name, password: req.body.password },
      );
      if (updatedUser === null) {
        res
          .status(404)
          .json(
            new RespondFormat(
              false,
              `user with email ${req.body.email} not found`,
            ),
          );
      }
      res
        .status(201)
        .json(new RespondFormat(true, 'Data Updated'), [
          await User.findOne({ email: req.body.email }),
        ]);
    } catch (error) {
      res.status(400).json(new RespondFormat(false, error.message));
    }
  });

  app.delete('/api/user', async (req, res) => {
    const deleted = await User.deleteMany({});
    if (deleted.deletedCount === 0) {
      res.status(404).json(new RespondFormat(false, 'Users data not found'));
    }
    res
      .status(200)
      .json(new RespondFormat(true, `${deleted.deletedCount} data deleted`));
  });

  app.delete('/api/user/name/:name', async (req, res) => {
    const deleted = await User.deleteMany({ name: req.params.name.trim() });
    if (deleted.deletedCount === 0) {
      res
        .status(404)
        .json(
          new RespondFormat(
            false,
            `Users data with name ${req.params.name} not found`,
          ),
        );
    }
    res
      .status(200)
      .json(new RespondFormat(true, `${deleted.deletedCount} data deleted`));
  });

  app.delete('/api/user/name', async (req, res) => {
    const deleted = await User.deleteMany({ name: '' });
    if (deleted.deletedCount === 0) {
      res
        .status(404)
        .json(new RespondFormat(false, `Users data with name "" not found`));
    }
    res
      .status(200)
      .json(new RespondFormat(true, `${deleted.deletedCount} data deleted`));
  });

  app.delete('/api/user/email/:email', async (req, res) => {
    const deleted = await User.deleteMany({ email: req.params.email.trim() });
    if (deleted.deletedCount === 0) {
      res
        .status(404)
        .json(
          new RespondFormat(
            false,
            `Users data with email ${req.params.email.trim()} not found`,
          ),
        );
    }
    res
      .status(200)
      .json(new RespondFormat(true, `${deleted.deletedCount} data deleted`));
  });
};
