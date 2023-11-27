const userController = require('../controllers/userController');
const router = require('express').Router();

router.get("/details", userController.userDetails);
router.get("/update", userController.userUpdate);
router.get("/delete", userController.userDelete);
router.get("/create", userController.userCreate);

module.exports = router