const express = require("express");
const router = express.Router();
const {addTransaction,deleteTransaction, getUser}=require('../Controller/transaction');


router.route('/getUser')
.get(getUser)
router.route('/addTransaction')
  .post(addTransaction);

router.route('/deleteTransaction')
  .post(deleteTransaction)


module.exports=router;