User login 
User sign up 
Total users in Database
Total user using system in 7 days
Total new user in system in 7 days
add books
borrow book for x days




//*************************************************************************************** */
        await loggedInUser.populate(
            loggedInUser.borrowedBook.map((_, index) => `borrowedBook.${index}.bookId`)
          ); //borrowedBook is an array, not a Mongoose document, so .populate() doesn’t exist on it, .populate() needs to be called on the parent document (loggedInUser).
        
/**************************************************************************************** */ 