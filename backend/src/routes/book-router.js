const express = require("express");
const { addBook, getBooks } = require("../controllers/book-controller");

const bookRouter = express.Router();

bookRouter.get("/book", getBooks)
bookRouter.post("/book/add", addBook)

module.exports = bookRouter;