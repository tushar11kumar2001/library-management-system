const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
      bookName : {
        type : String,
        require : true,
        minLength : 4,
        maxLength : 50,
        lowercase : true,
        trim : true
      },
      author : {
        type : String,
        require : true,
        minLength : 4,
        maxLength : 50,
        lowercase : true,
        trim : true
      },
      availability : {
        type : Boolean,
        default : true
      },
      quantity : {
        type : Number,
        require : true
      }
      
});

// bookSchema.index({bookName : 1, author : 1},{unique : true});
module.exports = mongoose.model("books",bookSchema);