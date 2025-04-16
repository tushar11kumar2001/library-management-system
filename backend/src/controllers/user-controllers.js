const { createNewUser } = require("../services/user-service");
const { validateSignUpData } = require("../utils/validateDataFromUser");
const UserModel = require("../models/user-schema");
const BookModel = require("../models/book-schema");

module.exports.signupUser = async (req, res) => {
  try {
    const { fullName, emailId, password } = req.body;
    validateSignUpData({ emailId, password });
    const existingUser = await UserModel.findOne({ emailId });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exist!!",
      });
    }
    const hashPassword = await UserModel.hashing(password);
    const newUser = await createNewUser({
      fullName,
      emailId,
      password: hashPassword,
    });
    if (!newUser) throw new Error();

    res.status(200).json({
      message: "User register successfully",
      data: newUser,
    });
  } catch (err) {
    res.status(400).json({ MESSAGE: err.message });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    validateSignUpData({ emailId, password });
    const loggedInUser = await UserModel.findOne({ emailId });
    if (!loggedInUser) throw new Error("INVALID CREDIANTIALS !!");

    const isValid = await loggedInUser.comparePassword(password);
    if (!isValid) throw new Error("INVALID CREDIANTIALS !!");

    loggedInUser.lastLogin = new Date();
    await loggedInUser.save();
    const token = loggedInUser.getJWT();

    res
      .status(200)
      .cookie("libraryAccessToken", token, {
        expires: new Date(Date.now() + 60 * 60 * 1000),
      })
      .json({
        message: "User log in  successfully",
        data: loggedInUser,
      });
  } catch (err) {
    res.status(400).json({ MESSAGE: err.message });
  }
};

module.exports.userInSystem = async (req, res) => {
  try {
    const { category } = req.params;
    const { day } = req.query;
    const limit = req.query.limit === "all" ? null : parseInt(req.query.limit);
    const lastDate = new Date();
    lastDate.setDate(lastDate.getDate() - day);
    let totalUsers;

    if (category === "total") totalUsers = await UserModel.find({});
    else if (category === "active")
      totalUsers = await UserModel.find({ lastLogin: { $gte: lastDate } });
    else if (category === "new")
      totalUsers = await UserModel.find({ createdAt: { $gte: lastDate } });
    else if (category === "withborrowedbooks")
      totalUsers = await UserModel.find({
        $expr: { $gt: [{ $size: "$borrowedBook" }, 0] },
      })
        .populate("borrowedBook.bookId", ["bookId", "bookName","author"])
        .limit(limit || 0);

    res.status(200).json({
      message:
        category === "total"
          ? "Total user in Database"
          : `Total ${category} user in last ${day} Day`,
      data: totalUsers,
    });
  } catch (err) {
    res.status(400).json({ MESSAGE: err.message });
  }
};

module.exports.userAction = async (req, res) => {
  try {
    const { userId, action, bookId } = req.params;
    if (!userId || !action || !bookId)
      throw new Error("something missing userID or action or bookID");

    const user = await UserModel.findOne({ _id: userId });
    if (!user) throw new Error("User is not found");

    const book = await BookModel.findOne({ _id: bookId });
    if (!book) throw new Error("Book is not found");

    if (action === "extend") {
      user.borrowedBook.map((e) => {
        if (e.bookId.toString() === bookId.toString()) {
          e.dueTo = new Date(e.dueTo).setDate(new Date(e.dueTo).getDate() + 10);
        }
      });
      await user.save();

      book.borrowUsers.map((e) => {
        if (e.userId.toString() === userId.toString()) {
          e.dueTo = new Date(e.dueTo).setDate(new Date(e.dueTo).getDate() + 10);
        }
      });
      await book.save();
      res.status(200).json({ MESSAGE: "done" });;
    }
  } catch (err) {
    res.status(400).json({ MESSAGE: "user action"+err.message });
  }
};
