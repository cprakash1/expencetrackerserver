require('dotenv').config()


const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const transactionrouter = require("./Routes/transaction.js");
const connectDB = require("./db.js");
const cors=require("cors");
const User=require('./models/auth')
const authRouter=require('./Routes/auth.js');
const { sendSession } = require('./Controller/session.js');
const sessionRoute=require('./Routes/session');



const app = express();



app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
connectDB();
app.use(cors());
app.use(morgan('dev'));



app.use(express.json());


app.use('/',authRouter);
app.use("/", transactionrouter);
app.use("/", sessionRoute);

app.post('/getSession', sendSession);
app.get('*',(req,res)=>{
  res.status(402).json({
    success: false,
  })
})




const port = 80;

app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}.`.white.bold
  );
});
