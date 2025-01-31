const mongoose = require("mongoose");

const connectToDataBase = async ()=>{
   await mongoose.connect(process.env.DATABASE_CONNECTION_STRING)
}

module.exports = connectToDataBase;
