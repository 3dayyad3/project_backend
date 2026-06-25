const jwt = require('jsonwebtoken');
const Admin = require('../model/admin.js');
const config = require('../config/jwt.js');

let token = '';

exports.adminToken = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email: email, password: password });
  if (!admin) {
    return res.status(401).json({ message: 'Login gagal' });
  }
  token = jwt.sign(
    { id: admin.id, email: admin.email, role: admin.role },
    config.secret,
    { expiresIn: config.expiresIn },
  );

  res.json({
    message: 'Login berhasil',
  });
};

exports.verifyAdminToken = (req, res, next) => {
  if (token === '') {
    return res.status(403).json({ message: 'Token tidak tersedia' });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token tidak valid' });
    }
    req.user = decoded;
    next();
  });
};
