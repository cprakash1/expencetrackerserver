const Transaction = require("../models/transaction");

// @desc Get all transactions
// @route GET /api/v1/transactions
// @access public
exports.getTransaction = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({});
    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: "Server error",
    });
  }
};

//@desc Add a transaction
// @route POST /api/v1/transactions
// @access public
exports.addTransaction = async (req, res, next) => {
  // const {text,amount} = req.body;
  try {
    const transaction = await Transaction.create(req.body);
    // const transaction=new Transaction(req.body);
    // await transaction.save();
    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(500).json({
        success: false,
        message: messages,
        error: "Validation error",
      });
    }
    res.status(500).json({
      success: false,
      message: err.message,
      error: "Server error",
    });
  }
};

//@desc Delete a transaction
// @route DELETE /api/v1/transactions/:id
// @access public
exports.deleteTransaction = async (req, res, next) => {
  // res.send('Delete transaction');
  try {
    const transaction = await Transaction.findById(req.params.id);
    if(!transaction){
        return res.status(404).json({
          success: false,
          message: "Transaction not found",
          error: "Transaction not found",
        });
    }
    await transaction.deleteOne();
    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: "Server error",
    });
  }
};
