const express = require('express');
const {register, login, getUser,sendOtp,verifyOtp,changePassword,adminLogin,getAdmin, getAdminData} = require("../controllers/auth-ctrl.js");
const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.post('/getUser',getUser);
router.post('/sendotp',sendOtp);
router.post('/verifyotp',verifyOtp);
router.post('/changePassword',changePassword);
router.post('/adminLogin',adminLogin);
router.post('/getAdmin',getAdmin);
router.post('/getAdminData',getAdminData);

module.exports = router;