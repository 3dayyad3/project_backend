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

module.exports = {
  homePage,
  registerPage,
  rootPage,
};
