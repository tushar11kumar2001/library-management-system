const { createBook, allBook } = require("../services/book-service");
const BooKModel = require("../models/book-schema");
const UserModel = require("../models/user-schema");

module.exports.addBook = async (req, res) => {
  try {
    const { bookId, bookName, author, quantity } = req.body;

    const existingBookWithSameAuthor = await BooKModel.findOne({
      bookName: bookName,
      author: author,
    });
    if (existingBookWithSameAuthor)
      throw new Error(
        "This book is already add in database with same author !!"
      );
    const newBook = await createBook({ bookId, bookName, author, quantity });
    if (!newBook) throw new Error();
    res
    .status(200)
    .json({
      message: "Book added  successfully",
      data: newBook,
    });
  } catch (err) {
    res
    .status(400)
    .json({ MESSAGE: err.message });
  }
};

module.exports.getBooks = async (req, res) => {
  try {
    const { category } = req.query;
    const { search, name } = req.query;

    let books;
    if (search) books = await BooKModel.find(
        {
          $or : [
            { bookName: { $regex : name, $options : "i"} },
            { author : {$regex : name, $options : "i"} }
          ]
        }
      ).select({
      bookId : 1,
      bookName : 1,
      author : 1,
      availability : 1,
      _id : 0
  })
    else if (category === "top") {
      books = await BooKModel.aggregate([
        { $addFields: { borrowCount: { $size: "$borrowUsers" } } },
        { $sort: { borrowCount: -1 } },
        { $project: { bookId: 1, bookName: 1, author: 1, availability: 1, _id: 0 } },
      ]);
    } 
    else if (category === "all") {
      books = await BooKModel.find({}).select({
        bookId : 1,
        bookName : 1,
        author : 1,
        availability : 1,
        _id : 0
    });
    } 
    else if (category === "borrow") {
      // books = await BooKModel.find({ borrowUsers : {$ne : []} });
      books = await BooKModel.find({
        $expr: { $gt: [{ $size: "$borrowUsers" }, 0] },
      }).populate("borrowUsers.userId", ["fullName", "emailId"]);
    }
    // else if(category === "overdue"){
    //     const todayDate = new Date();
    //     books = await BooKModel.find({
    //         borrowUsers: {
        
    //             $elemMatch: {
    //               dueTo: { $lt: todayDate }
    //             },
      
    //           $ne: []
    //         }
    //       });
    // }
    res
    .status(200)
    .json({
      message: "Successfully",
      data: books,
    });
  } catch (err) {
    res
    .status(400)
    .json({ MESSAGE: err.message });
  }
};

module.exports.bookBorrowByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BooKModel.findOne({ _id: id });

    if (!book)
      throw new Error(
        "This book is not available in  library, you can request to the admin.."
      );
    if (!book.availability)
      throw new Error("This book is temporary unavailable..");

    const loggedInUser = req.user;

    loggedInUser.borrowedBook.push({ bookId: book._id });
    // const allowUser = book.borrowUsers.filter((e)=> e.userId.equals(loggedInUser._id));

    book.borrowUsers.push({ userId: loggedInUser._id });

    book.remainingQty = --book.remainingQty;
    if (book.remainingQty == 0) book.availability = false;
    await loggedInUser.save();
    await book.save();
    res
    .status(200)
    .json({
      message: "Successfull",
      data: loggedInUser,
    });
  } catch (err) {
    res
    .status(400)
    .json({ MESSAGE: err.message });
  }
};
