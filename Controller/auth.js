const User= require('../models/auth');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const secret =process.env.SECRET;

exports.loggedIn = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username}).populate('transactions');
        const payload={userId: user._id};
        const token = await jwt.sign(payload,secret);
        if(!user){
          return res.status(401).json({
            success: false,
            message: err,
            msg1: "User not found"
          });
        }
        const response=await bcrypt.compare(req.body.password, user.hash);
        // console.log(req.body)
        // req.session.user=req.username;
        // res.send("Success");
        // req.session.user=user._id;
        if(response){
          return res.status(200).json({
              success: true,
              user: user._id,
              transactions: user.transactions,
              token: token
          });
        }else{
          return res.status(401).json({
            success: false,
            message: err,
            msg1: "password donot match"
          });
        }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err
      });
    }
  };
exports.loggedOut = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            user: null,
            transactions: []
        });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err
      });
    }
  };

module.exports.submitRegisterForm=async(req,res,next)=>{
    try{
        console.log(req.body);
        const {username,password,email}=req.body;
        // console.log(username,password,email);
        const salt=bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newuser=await User.create({username,password,hash,salt,email});
        newuser.save();
        console.log(newuser);
        // req.sessions.user=newuser._id;
        res.status(200).json({
            success: true,
            user: newuser._id,
            transactions: newuser.transactions
        });
    }catch(e){
        console.log(e);
        res.status(402).json({
            success: false,
            message: e
        })
    }
};



