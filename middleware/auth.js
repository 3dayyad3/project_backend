const jwt = require('jsonwebtoken');
const RespondFormat = require('../respondFormat');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json(new RespondFormat(false, 'Tidak Berhasil'));
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, 'SECRET_KEY', (err, decoded) => {
    if (err) {
      return res.status(403).json(new RespondFormat(false, 'Tidak Berhasil'));
    }

    req.user = decoded;
    next();
  });
};
