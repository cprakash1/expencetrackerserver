const mongoose=require('mongoose')
const schema=mongoose.Schema;
const Transaction=require('./Transtion');

const userSchema=new schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
        required:true,
        unique:true,
    },
    hash:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    transactions:[{
        type:schema.Types.ObjectId,
        ref:'Transaction'
    }]
});


module.exports=mongoose.model('User',userSchema);