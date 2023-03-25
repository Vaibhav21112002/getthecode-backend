const express = require('express');
const {register, login, getUser,sendOtp,verifyOtp,changePassword} = require("../controllers/auth-ctrl.js");
const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.post('/getUser',getUser);
router.post('/sendotp',sendOtp)
router.post('/verifyotp',verifyOtp)
router.post('/changePassword',changePassword)

module.exports = router;