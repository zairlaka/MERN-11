const userController = require('../controllers/userController');
const router = require('express').Router();

router.post("/createUser", userController.createUser);
router.get("/getAllUsers", userController.getAllUsers);
router.get("/getUser", userController.getUser);
router.delete("/deleteUser", userController.deleteUser);
router.put("/updateUser", userController.updateUser);

module.exports = router