const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
      name : {
        type : String,
        require : true,
      },
      author : {
        type : String,
        require : true,
        minLength : 4,
        maxLength : 50
      },
      availability : {
        type : Boolean,
        default : true
      },
      
});

module.exports = mongoose.model("books",bookSchema);