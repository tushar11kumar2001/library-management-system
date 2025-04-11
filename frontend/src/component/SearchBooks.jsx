import { useSelector } from "react-redux";

const SearchBooks = () => {
    const searchBooks = useSelector(store=>store.bookList.searchBooks);
    return ( 
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Search Results</h2>
        <div className="flex gap-4 overflow-x-auto">
          {searchBooks.map((book, index) => (
            <div key={book.bookId} className="min-w-[140px] bg-white rounded-xl shadow p-2 text-center">
              <img src={import.meta.env.VITE_TEMPORARY_BOOKCOVER} alt={book.bookName} className="h-32 w-full object-cover rounded-md mb-2" />
              <h3 className="text-sm font-medium">{book.bookName.toUpperCase()}</h3>
              <p className="text-xs text-gray-500">{book.author}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default SearchBooks;

  