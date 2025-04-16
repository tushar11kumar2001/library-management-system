import { useSelector } from "react-redux";
import BookCard from "./BookCard";
import DialogBox from "./DialogBox";
import { useState } from "react";

const SearchBooks = () => {
    const [ open , setOpen ] = useState(false); 
    const [ bookDetail , setBookDetail ] = useState({}); 
    const searchBooks = useSelector(store=>store.bookList.searchBooks);
    const closeAction = () => {
      setOpen(false);
    }
    return ( 
      <div className="mt-6">
             <DialogBox
                bookFlag={true}
                open={open}
                bookDetails={bookDetail}
                onClose={closeAction}
                label="Book Details"
                heading="Book Information"
                subHeading="Borrower Details" />
        <h2 className="text-lg font-semibold mb-4">Search Results</h2>
        <div className="flex gap-4 overflow-x-auto">
          {searchBooks.map((book) => (
            <BookCard book={book} key={book.bookId} setOpen={setOpen} setBookDetail={setBookDetail}/>
          ))}
        </div>
      </div>
    );
  };

  export default SearchBooks;

  