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
  adminToken = jwt.sign({ id: admin.id, email: admin.email }, config.secret, {
    expiresIn: config.expiresIn,
  });

  res.json(new RespondFormat(true, 'Login berhasil'));
};

exports.verifyToken = (req, res, next) => {
  if (req.query.role === 'user') {
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
  } else if (req.query.role === 'admin') {
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
  } else {
    res
      .status(404)
      .json(
        new RespondFormat(false, 'Role ' + req.params.role + ' tidak dikenal'),
      );
  }
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
  userToken = jwt.sign({ id: user.id, email: user.email }, config.secret, {
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
    console.log(req.user);
    next();
  });
};
