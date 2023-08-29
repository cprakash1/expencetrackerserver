const User = require("../models/auth");
const Transaction = require("../models/Transtion");



// @desc Get all transactions


// @route GET /
// @access public
exports.getUser = async (req, res, next) => {
  try {
    if(!req.session.user){
      return res.status(200).json({
              success: true,
              user: null,
              transactions: [],
            });
    }
    const userData = await User.findById(req.body._id).populate('transactions');
    res.status(200).json({
      success: true,
      user: userData._id,
      transactions: userData.transactions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message:err
    });
  }
};



//@desc Add a transaction

// @route POST 
// @access public
exports.addTransaction = async (req, res, next) => {
  try {
    console.log(req.body)
    const {newTransaction,user}=req.body;
    const transaction = await Transaction.create(newTransaction);
    transaction.save();
    const user1= await User.findById(user).populate('transactions');
    user1.transactions.push(transaction);
    await user1.save();
   
    res.status(201).json({
      success: true,
      user: user1._id,
      transactions: user1.transactions,
    });
  } catch (err) {
    console.log(err)
    // if (err.name === "ValidationError") {
    //   const messages = Object.values(err.errors).map((val) => val.message);
    //   return res.status(500).json({
    //     success: false,
    //     message: messages,
    //     error: "Validation error",
    //   });
    // }
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};



//@desc Delete a transaction
// @route DELETE /api/v1/transactions/:id
// @access public
exports.deleteTransaction = async (req, res, next) => {
  // console.log(req.body,"hi");
  try {
    const userData = await User.findById(req.body.user);
    if(!userData){
        return res.status(404).json({
          success: false,
          message: "Transaction not found",
          error: "Transaction not found",
        });
    }
    await User.findByIdAndUpdate(req.body.user,{$pull:{transactions:req.body.TransactionId}});
    await Transaction.findByIdAndDelete(req.body.TransactionId);
    res.status(200).json({
      success: true,
      user: userData._id,
      transactions: userData.transactions
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: err
    });
  }
};
