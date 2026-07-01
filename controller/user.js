const User = require('../model/user.js');
const RespondFormat = require('../respondFormat.js');
const url = require('url');

exports.getUser = async (req, res) => {
  const userData = await User.find({});
  if (userData.length === 0) {
    res.status(404).json(new RespondFormat(false, 'Users data not avaible'));
  }
  res.status(200).json(new RespondFormat(true, 'User Data found', userData));
};

exports.getCurrentUser = async (req, res) => {
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

exports.putCurrentUserName = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.body.email },
      { name: req.body.name },
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

exports.putCurrentUserPassword = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.body.email },
      { password: req.body.password },
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

exports.changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;

    if (req.user.email !== email) {
      res.status(403).json(new RespondFormat(false, 'Forbidden'));
    }

    if (user.password !== oldPassword) {
      return res
        .status(404)
        .json(new RespondFormat(false, 'Password lama salah.'));
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(404)
        .json(new RespondFormat(false, 'Konfirmasi password tidak cocok.'));
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { password: req.body.password },
    );

    if (!updatedUser) {
      res.status(404).json(new RespondFormat(false, 'Email tidak ditemukan.'));
    }

    await updatedUser.save();

    res
      .status(200)
      .json(
        new RespondFormat(true, 'Password berhasil diubah.', [updatedUser]),
      );
  } catch (err) {
    res.status(404).json(new RespondFormat(false, err.message));
  }
};
