const BookModel = require("../models/book-schema");
module.exports.addBook = async ({ bookName, author, quantity }) => {
      return await new BookModel({ bookName, author, quantity }).save();
}