const mongoose = require('mongoose');
const schema=mongoose.Schema;


const SessionSchema = new mongoose.Schema({
    userId:{
        type : String,
        default: null
    },
    transactions:[{
        type:schema.Types.ObjectId,
        ref:'Transaction',
        default: []
    }]
});

module.exports= mongoose.model('SessionUser',SessionSchema);