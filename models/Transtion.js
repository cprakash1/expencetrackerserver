const mongoose=require('mongoose')
const schema=mongoose.Schema;

const trasactionSchema=new schema({
    text:{
        type:String,
        required:[true,"Please add a text"],
        trim:true,
    },
    amount:{
        type:Number,
        required:[true,"Please add an amount"],
    },
    date:{
        type:Date,
        default:Date.now
    },
    description:{
        type:String,
        required:[true,"Please add a description"],
    }
});



module.exports=mongoose.model('Transaction',trasactionSchema);