import { useDispatch, useSelector } from "react-redux";
import ActionButton from "./ActionButton";
import SeeAllButton from "./SeeAllButton";
import { getAllBooks } from "../redux/BookListSlice";

const BookList = () => {
  const dispatch = useDispatch();
  const allBooks = useSelector(store=>store.bookList.allBooks);

  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">Books List</h2>
          <ActionButton label="Add New Book" onClick={() => alert("Add Book Clicked")} />
        </div>
        <div className="overflow-x-auto shadow-sm border-b border-gray-200 rounded-md">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500 border-b border-gray-200">
                <th className="pb-2">Book ID</th>
                <th className="pb-2">Title</th>
                <th className="pb-2">Author</th>

              </tr>
            </thead>
            <tbody>
              {allBooks.map((book) => (
                <tr
                  key={book.bookId}
                  className="hover:bg-gray-50 text-black border-b border-gray-200"
                >
                  <td className="py-2">{book.bookId}</td>
                  <td className="py-2">{book.bookName.toUpperCase()}</td>
                  <td className="py-2">{book.author}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <SeeAllButton onClick={() => alert("See All Books")} />
      </div>
    </div>
  );
};

export default BookList;
