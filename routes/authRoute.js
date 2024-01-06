const router = require('express').Router();

const {userRegister} = require('../controller/authController');

// router.get("/", (req, res) => res.send("auth API Running"));

router.post('/user-register', userRegister);

module.exports = router;