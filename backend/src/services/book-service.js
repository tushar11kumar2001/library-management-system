const BookModel = require("../models/book-schema");
module.exports.createBook = async ({ bookName, author, quantity }) => {
      return await new BookModel({ bookName, author, quantity }).save();
}
module.exports.allBook = async ()=>{
      return await BookModel.find({});
}