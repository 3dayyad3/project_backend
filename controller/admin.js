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
};
