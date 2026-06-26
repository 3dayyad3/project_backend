const loginPage = (req, res) => {
  res.render('auth/login');
};

const registerPage = (req, res) => {
  res.render('auth/register');
};

const rootPage = async (req, res, next) => {
  req.url = '/login';
  next();
};

const adminPage = (req, res) => {
  res.render('dashboard/admin');
};

const userPage = (req, res) => {
  res.render('dashboard/user', { test: req.user });
};

module.exports = {
  loginPage,
  registerPage,
  rootPage,
  adminPage,
  userPage,
};
