const express = require("express");
const { addBook } = require("../controllers/book-controller");

const bookRouter = express.Router();

bookRouter.post("/book/add", addBook)

module.exports = bookRouter;