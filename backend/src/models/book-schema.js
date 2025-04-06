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
        require : true,
        default : 3
      },
      borrowUsers : {
        type : [{
            userId : {
              type : mongoose.Schema.Types.ObjectId,
              ref : "users"
            }
          }],
        default : [],
        validate : {
          validator : (value)=>{
              const ids = value.map(e => e.userId.toString());
              const uniqueId = new Set(ids);
              return value.length === uniqueId.size;
        },
        message : "This book is already borrowe by this user"
        }
      }
      
});

// bookSchema.index({bookName : 1, author : 1},{unique : true});
module.exports = mongoose.model("books",bookSchema);