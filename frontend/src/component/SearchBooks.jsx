import { useSelector } from "react-redux";
import BookCard from "./BookCard";

const SearchBooks = () => {
    const searchBooks = useSelector(store=>store.bookList.searchBooks);
    return ( 
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Search Results</h2>
        <div className="flex gap-4 overflow-x-auto">
          {searchBooks.map((book) => (
            <BookCard book={book} key={book.bookId}/>
          ))}
        </div>
      </div>
    );
  };

  export default SearchBooks;

  