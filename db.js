const mongoose = require('mongoose');

const MONGO_URI="mongodb+srv://cprakash:cpprakash@cluster0.i03devl.mongodb.net/expencetracker?retryWrites=true&w=majority"
const connectDB=async ()=>{
    try{
        const connecting= await mongoose.connect(MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log(`MongoDB Connected: ${connecting.connection.host}`.cyan.bold.underline);
    }catch(e){
        console.log(`Error:${e.message}`.red.bold);
        process.exit(1);
    }
}

module.exports=connectDB;