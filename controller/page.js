const loginPage = (req, res) => {
  res.render("auth/login");
};

const registerPage = (req, res) => {
  res.render("auth/register");
};

const rootPage = async (req, res, next) => {
  req.url = "/login";
  next();
};

const adminPage = (req, res) => {
  res.render("dashboard/admin");
};

module.exports = {
  loginPage,
  registerPage,
  rootPage,
<<<<<<< HEAD
=======
  adminPage,
>>>>>>> f6e1be190e52da08d7e4a008374154704c99caac
};
