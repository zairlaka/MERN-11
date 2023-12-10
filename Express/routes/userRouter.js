const userController = require('../controllers/userController');
const router = require('express').Router();
const { authorize, admin, trainee, instructor } = require("../middleware")

router.post("/createUser", authorize, userController.createUser);
router.get("/getAllUsers", authorize, trainee, userController.getAllUsers);
router.get("/getUser", authorize, instructor,userController.getUser);
router.delete("/deleteUser",admin, userController.deleteUser);
router.put("/updateUser", userController.updateUser);

module.exports = router