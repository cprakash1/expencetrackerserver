const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const trasactionSchema=new Schema({
    text:{
        type:String,
        required:[true,"Please add a text"],
        trim:true,
    },
    amount:{
        type:Number,
        required:[true,"Please add an amount"],
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model("Trasaction",trasactionSchema);