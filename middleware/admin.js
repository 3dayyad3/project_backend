const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const RespondFormat = require('../respondFormat');
exports.isAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json(new RespondFormat(false, 'Tidak Berhasil'));
  }
  jwt.verify(authHeader, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json(new RespondFormat(false, 'Tidak Berhasil'));
    }
    req.user = decoded;
    next();
  });
};
