const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectToDataBase = require("./src/db-config/connectToDataBase");
const userRouter = require("./src/routes/user-router");



const app = express();

app.use(express.json());
app.use("/",userRouter);

app.use("/",(req,res)=>{
    res.send("hellow");
})


connectToDataBase().then(()=>{
    console.log("Connect Established...");
    app.listen(process.env.PORT, ()=>{
        console.log(`server listen on ${process.env.PORT}`)
    });
}).catch((err)=>{
    console.log("MESSAGE : ", err.message);
    
})
