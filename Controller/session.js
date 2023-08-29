const SessionUser= require('../models/session.js');
const User= require('../models/auth');
const jwt=require('jsonwebtoken');
const secret =process.env.SECRET;


  
  
  module.exports.sendSession=async(req,res)=>{
    try{
      const {token}=req.body;
      // console.log(req.body);
      // if()
      const payload=jwt.verify(token,secret);
      const user=await User.findById(payload.userId).populate('transactions');
      return res.status(200).json({
        success: true,
        user: payload.userId,
        transactions: user.transactions
      });
    }catch(e){
      console.log(e);
          res.status(402).json({
              success: false,
              message: e
          })
    }
  }
