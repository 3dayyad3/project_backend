const pageControler = require("../controller/page.js");
const router = require("express").Router();

router.get("/", pageControler.rootPage);
router.get("/login", pageControler.loginPage);
router.get("/register", pageControler.registerPage);
router.get("/admin/dashboard", pageControler.adminPage);

module.exports = router;
