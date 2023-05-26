const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const transactionrouter = require("./Routes/transaction.js");
const connectDB = require("./db.js");
const cors=require("cors");
// const bodyParser = require("body-parser");


const app = express();
dotenv.config({ path: "./config.env" });
connectDB();
app.use(cors());
app.use(morgan('dev'));
// console.log(process.env.MONGO_URI);
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// //   useCreateIndex: true,
//   // useFindAndModify: false
// }).then(()=>{
//     console.log("Database Connnected".blue.bold);
// }).catch(err => console.log(err));

app.use(express.json());
// app.use(bodyParser.json());
app.use("/api/v1/transactions", transactionrouter);
app.get("/", (req, res) => {
  res.send("Hell");
});

const port = 3001;

app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}.`.white.bold
  );
});
