const express = require("express");
const { addBook, getBooks, bookBorrowByUser } = require("../controllers/book-controller");
const { userAuth } = require("../middleware/auth");

const bookRouter = express.Router();

bookRouter.get("/book", getBooks);
bookRouter.post("/book/add", addBook); // book add by admin only and admin auth middleware is pending
bookRouter.patch("/book/b/:id", userAuth, bookBorrowByUser);


module.exports = bookRouter;