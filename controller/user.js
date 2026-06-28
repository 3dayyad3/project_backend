const User = require('../model/user.js');
const RespondFormat = require('../respondFormat.js');
const url = require('url');

exports.getUser = async (req, res) => {
  const query = url.parse(req.url, true).query;
  if (query.email !== null) {
    const userData = await User.findOne({ email: query.email });
    if (userData === null) {
      res
        .status(404)
        .json(
          new RespondFormat(
            false,
            'User data with email ' + query.email + ' not avaible',
          ),
        );
    }
    res
      .status(200)
      .json(
        new RespondFormat(
          true,
          'User data with email ' + query.email + ' avaible',
          [userData],
        ),
      );
  }
  const userData = await User.find({});
  if (userData.length === 0) {
    res.status(404).json(new RespondFormat(false, 'Users data not found'));
  }
  res.status(200).json(new RespondFormat(true, 'User Data found', userData));
};

exports.getCurrentUserEmail = async (req, res) => {
  const userData = await User.findOne({ email: req.user.email });
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
};

exports.get;

exports.postUser = async (req, res) => {
  try {
    const newUser = new User({
      name: new String(req.body.name).trim(),
      email: new String(req.body.email).trim(),
      password: new String(req.body.password).trim(),
    });
    const savedUser = await newUser.save();
    res.status(201).json(new RespondFormat(true, 'Data is saved', [savedUser]));
  } catch (error) {
    res.status(400).json(new RespondFormat(false, error.message));
  }
};

exports.putUser = async (req, res) => {
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
};

exports.putUserEmail = async (req, res) => {
  try {
    if (req.user.email !== req.body.email) {
      res.json(new RespondFormat(false, 'Hanya current user yang bisa'));
    }
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
      .json(new RespondFormat(true, 'Data Updated', [updatedUser]));
  } catch (error) {
    res.status(400).json(new RespondFormat(false, error.message));
  }
};

exports.deleteUser = async (req, res) => {
  const deleted = await User.deleteMany({});
  if (deleted.deletedCount === 0) {
    res.status(404).json(new RespondFormat(false, 'Users data not found'));
  }
  res
    .status(200)
    .json(new RespondFormat(true, `${deleted.deletedCount} data deleted`));
};

exports.deleteUserName = async (req, res) => {
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
};

exports.deleteUserWithEmptyName = async (req, res) => {
  const deleted = await User.deleteMany({ name: '' });
  if (deleted.deletedCount === 0) {
    res
      .status(404)
      .json(new RespondFormat(false, `Users data with name "" not found`));
  }
  res
    .status(200)
    .json(new RespondFormat(true, `${deleted.deletedCount} data deleted`));
};

exports.deleteUserEmail = async (req, res) => {
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
};

//Ganti Password
const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.send('Email tidak ditemukan.');
    }

    if (user.password !== oldPassword) {
      return res.send('Password lama salah.');
    }

    if (newPassword !== confirmPassword) {
      return res.send('Konfirmasi password tidak cocok.');
    }

    user.password = newPassword;

    await user.save();

    res.send('Password berhasil diubah.');
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = {
  getUser,
  getUserEmail,
  postUser,
  putUser,
  deleteUser,
  deleteUserName,
  deleteUserWithEmptyName,
  deleteUserEmail,
  changePassword,
};
