const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");

const connectToDataBase = require("./src/db-config/connectToDataBase");
const UserRouter = require("./src/routes/user-router");
const BookRouter = require("./src/routes/book-router");
const cookieParser = require("cookie-parser");
const AdminRouter = require("./src/routes/admin-router");

const app = express();





app.use(express.json());
app.use(cookieParser());

app.use("/", UserRouter);
app.use("/", BookRouter);
app.use("/", AdminRouter);
app.use("/", (req, res) => {
  res.send("hellow");
});

connectToDataBase()
  .then(() => {
    console.log("Connect Established...");
    app.listen(process.env.PORT, () => {
      console.log(`server listen on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MESSAGE : ", err.message);
  });
