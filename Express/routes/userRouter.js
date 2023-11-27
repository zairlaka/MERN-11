const userController = require('../controllers/userController');
const router = require('express').Router();

router.get("/details", userController.userDetails);
router.put("/update", userController.userUpdate);
router.delete("/delete", userController.userDelete);
router.post("/create", userController.userCreate);

module.exports = router