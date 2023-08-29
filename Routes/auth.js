const express = require("express");
const router = express.Router();
const passport=require('passport')
const {loggedOut,submitRegisterForm,loggedIn}=require('../Controller/auth');
const {createSession, sendSession,setSession}=require('../Controller/session')

router.route('/login')
  .post(loggedIn)

router.route('/register')
    .post(submitRegisterForm);

router.route('/logout')
  .get(loggedOut);




module.exports=router;