const authController = require("../controllers/authController");
const router = require("express").Router();

router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;