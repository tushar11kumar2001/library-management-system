const AdminModel = require("../models/admin-schema");
const UserModel = require("../models/user-schema");
const BookModel = require("../models/book-schema");
const { validateSignUpData } = require("../utils/validateDataFromUser");

module.exports.loginAdmin = async (req, res)=>{
    try{
        const { emailId, password } = req.body;
        validateSignUpData({ emailId, password });
        const loggedInAdmin = await AdminModel.findOne({ emailId });
        if(!loggedInAdmin) throw new Error("INVALID CREDIANTIALS email!!");

        // const isValid = await loggedInAdmin.comparePassword(password);
        // if(!isValid) throw new Error("INVALID CREDIANTIALS password!!");

        if(password !== loggedInAdmin.password) throw new Error("INVALID CREDIANTIALS password!!");
        const token = loggedInAdmin.getJWT();
        
        res
        .status(200)
        .cookie("libraryAdminToken", token, { expires : new Date(Date.now() + 60*60*1000 )} )
        .json({
                message : "Admin log in  successfully",
                data : loggedInAdmin
            })
    }catch(err){
        res
        .status(400)
        .json({MESSAGE : err.message});
    }
};

module.exports.adminAction = async (req, res) => {

    try {
      const { userId, action, bookId } = req.params;
      if (!userId || !action || !bookId)
        throw new Error("something missing userID or action or bookID");
  
      const user = await UserModel.findOne({ _id: userId });
      if (!user) throw new Error("User is not found");
  
      const book = await BookModel.findOne({ _id: bookId });
      if (!book) throw new Error("Book is not found");
  
      if (action === "extend") {
        user.borrowedBook.map((book) => {
          if (book.bookId.toString() === bookId.toString()) {
            book.dueTo = new Date(book.dueTo).setDate(new Date(book.dueTo).getDate() + 10);
          }
        });
        await user.save();
  
        book.borrowUsers.map((user) => {
          if (user.userId.toString() === userId.toString()) {
            user.dueTo = new Date(user.dueTo).setDate(new Date(user.dueTo).getDate() + 10);
          }
        });
        await book.save();
        res.status(200).json({ MESSAGE: "done" });
      }
      else if(action === "release"){
        user.borrowedBook = user.borrowedBook.filter((book) => book.bookId.toString() !== bookId.toString());
        await user.save();
  
        book.borrowUsers = book.borrowUsers.filter((user) => user.userId.toString() !== userId.toString());
        book.remainingQty += 1; // Increment the remaining quantity
        if (book.remainingQty > book.totalQty) {
          book.remainingQty = book.totalQty; // Ensure it doesn't exceed total quantity
        }
        await book.save();
        res.status(200).json({ MESSAGE: "done" });
      }
    } catch (err) {
      res.status(400).json({ MESSAGE: "user action "+err.message });
    }
  };