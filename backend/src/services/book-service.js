const BookModel = require("../models/book-schema");
module.exports.createBook = async ({ bookId, bookName, author, quantity }) => {
      return await new BookModel({ bookId, bookName, author, quantity }).save();
}
module.exports.allBook = async ()=>{
      return await BookModel.find({});
}