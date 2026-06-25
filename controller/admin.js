<<<<<<< HEAD
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: req.body.email });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Login gagal' });
  }
  const token = jwt.sign({ id: user.id, email: user.email }, config.secret, {
    expiresIn: config.expiresIn,
  });
  res.json({
    message: 'Login berhasil',
    token: token,
  });
=======
const RespondFormat = require('../respondFormat.js');

const Admin = require('../model/admin.js');

const getAdmin = async (req, res) => {
  const adminData = await Admin.find({});
  if (adminData.length === 0) {
    res.status(404).json(new RespondFormat(false, 'Admin is empty'));
  }
  res.status(200).json(new RespondFormat(true, 'Admin data found', adminData));
};

const postAdmin = async (req, res) => {
  try {
    const newAdmin = new Admin({
      name: new String(req.body.name).trim(),
      email: new String(req.body.email).trim(),
      password: new String(req.body.password).trim(),
    });
    const savedAdmin = await newAdmin.save();
    res
      .status(201)
      .json(new RespondFormat(true, 'Data is saved', [savedAdmin]));
  } catch (error) {
    res.status(400).json(new RespondFormat(false, error.message));
  }
};

module.exports = {
  getAdmin,
  postAdmin,
>>>>>>> 65f01171180dbfa98960e21177a546b2fc54b128
};
