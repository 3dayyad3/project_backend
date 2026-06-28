const jwt = require('jsonwebtoken');
const Admin = require('../model/admin.js');
const User = require('../model/user.js');
const config = require('../config/jwt.js');

const RespondFormat = require('../respondFormat.js');

let adminToken = '';

exports.adminToken = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email: email, password: password });
  if (!admin) {
    return res.status(401).json(new RespondFormat(false, 'Login Gagal'));
  }
  adminToken = jwt.sign(
    { email: admin.email, name: admin.name },
    config.secret,
    {
      expiresIn: config.expiresIn,
    },
  );

  res.json(new RespondFormat(true, 'Login berhasil'));
};

exports.verifyAdminToken = (req, res, next) => {
  if (adminToken === '') {
    return res
      .status(403)
      .json(new RespondFormat(false, 'Token admin tidak ada'));
  }
  jwt.verify(adminToken, config.secret, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json(new RespondFormat(false, 'Token admin tidak valid'));
    }
    req.admin = decoded;
    next();
  });
};

let userToken = '';

exports.userToken = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email, password: password });
  if (!user) {
    return res.status(401).json(new RespondFormat(false, 'Login Gagal'));
  }
  userToken = jwt.sign({ email: user.email, name: user.name }, config.secret, {
    expiresIn: config.expiresIn,
  });

  res.json(new RespondFormat(true, 'Login berhasil'));
};

exports.verifyUserToken = (req, res, next) => {
  if (userToken === '') {
    return res
      .status(403)
      .json(new RespondFormat(false, 'Token user tidak ada'));
  }
  jwt.verify(userToken, config.secret, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json(new RespondFormat(false, 'Token user tidak valid'));
    }
    req.user = decoded;
    next();
  });
};
