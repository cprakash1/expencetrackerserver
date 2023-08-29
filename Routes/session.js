const express = require("express");
const router = express.Router();
const { sendSession}=require('../Controller/session')


router.route('/getSession')
  .post(sendSession);


module.exports=router;