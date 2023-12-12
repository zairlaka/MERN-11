const authController = require("../controllers/authController");
const router = require("express").Router();
const { sessionCheck } = require("../middleware")


router.post("/signup", authController.signup);
router.post("/login", sessionCheck, authController.login);
router.delete("/logout", authController.logout);

module.exports = router;