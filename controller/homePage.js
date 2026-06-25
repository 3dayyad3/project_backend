const homePage = (req, res) => {
  res.render('auth/login');
};

const registerPage = (req, res) => {
  res.render('auth/register');
};

module.exports = {
  homePage,
  registerPage,
};
