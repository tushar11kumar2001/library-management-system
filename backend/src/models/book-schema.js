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
      totalQty : {
        type : Number,
        default : 3
      },
      remainingQty : {
        type : Number
      },
  
      borrowUsers : {
        type : [{
            userId : {
              type : mongoose.Schema.Types.ObjectId,
              ref : "users"
            },
            dueTo : {
              type : Date,
              default: ()=>new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
            
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
bookSchema.pre("save", function(next){
  if(this.isNew && this.remainingQty == null){
    this.remainingQty = this.totalQty;
  }
  next();
});

module.exports = mongoose.model("books",bookSchema);