const authController = require("../controllers/authController");
const router = require("express").Router();
const { sessionCheck } = require("../middleware")


router.post("/signup", sessionCheck, authController.signup);
router.post("/login", authController.login);
router.delete("/logout", authController.logout);
router.get("/getsession", authController.getSession);
router.get("/getRefreshToken", authController.getRefreshToken);


module.exports = router;