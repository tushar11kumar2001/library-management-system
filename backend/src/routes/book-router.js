const express = require("express");
const { addBook, getBooks, bookBorrowByUser, categoryOfBooks } = require("../controllers/book-controller");
const { userAuth } = require("../middleware/auth");

const BookRouter = express.Router();

BookRouter.get("/book", getBooks);
BookRouter.post("/book/add", addBook); // book add by admin only and admin auth middleware is pending
BookRouter.patch("/book/borrow/:id", userAuth, bookBorrowByUser);



module.exports = BookRouter;