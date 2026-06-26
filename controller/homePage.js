const homePage = (req, res) => {
  res.render('auth/login');
};

const registerPage = (req, res) => {
  res.render('auth/register');
};

const rootPage = async (req, res, next) => {
  req.url = '/login';
  next();
};

const dashboard = async (req, res) => {
  res.render('auth/user/dashboard');
};

const dashboard = async (req, res) => {
  res.render('auth/admin/dashboard');
};

module.exports = {
  homePage,
  registerPage,
  rootPage,
  dashboard,
};
