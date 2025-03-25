const { createBook, allBook } = require("../services/book-service");
const BooKModel = require("../models/book-schema");

module.exports.addBook = async (req, res)=>{
    try{
         const { bookName, author, quantity } = req.body;
         
         const existingBookWithSameAuthor = await BooKModel.findOne({
            bookName : bookName, 
            author : author
        });
        if(existingBookWithSameAuthor) throw new Error("This book is already add in database with same author !!");
         const newBook = await createBook({ bookName, author, quantity } );
         if(!newBook) throw new Error;
         res.
         status(200).
         json({
             message : "Book added  successfully",
             data : newBook
         })
         
    }catch(err){
        res.
        status(400).
        json({MESSAGE : err.message});
    }
}

module.exports.getBooks = async (req, res)=>{
    try{
         const books = await allBook();
         res.
         status(200).
         json({
            message : "Successfully",
            data : books
         })
    }catch(err){
        res.
        status(400).
        json({MESSAGE : err.message});
    }
   
}