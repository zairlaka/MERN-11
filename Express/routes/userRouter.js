const userController = require('../controllers/userController');
const router = require('express').Router();
const { authenticate_user, admin, trainee, instructor } = require("../middleware")

router.post("/createUser", authenticate_user, instructor, userController.createUser);
router.get("/getAllUsers", authenticate_user, instructor, userController.getAllUsers);
router.get("/getUser", authenticate_user, trainee, userController.getUser);
router.delete("/deleteUser",admin, userController.deleteUser);
router.put("/updateUser", userController.updateUser);

module.exports = router