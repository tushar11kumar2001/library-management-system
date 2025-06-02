import { useDispatch, useSelector } from "react-redux";
import ActionButton from "./ActionButton";
import SeeAllButton from "./SeeAllButton";
import { AllBookListThunk } from "../redux/BookSlice";
import BookCard from "./BookCard";
import { useEffect, useState } from "react";
import NewBookForm from "./NewBookForm";

const BookList = ({ admin, landing }) => {
  
  const [showNewBookForm, setShowNewBookForm] = useState(false);
  const dispatch = useDispatch();
  const allBooks = useSelector(store => store.bookList.allBooks);
  const seeAllBooks = () => {
    if (allBooks.length === parseInt(import.meta.env.VITE_LIMIT)) dispatch(AllBookListThunk("all"));
    else dispatch(AllBookListThunk(import.meta.env.VITE_LIMIT));
  }

  useEffect(()=>{
    dispatch(AllBookListThunk(admin ? import.meta.env.VITE_LIMIT : "all"));
  },[]);

  return (
    <div className=" w-1/2   min-h-[200px] max-h-[300px]  overflow-scroll overflow-x-hidden booklist-container">
      {showNewBookForm && <NewBookForm setShowNewBookForm={setShowNewBookForm}/>}
      {admin && !showNewBookForm &&
        <div className="w-full  bg-white shadow rounded-xl p-4 flex flex-col justify-between  ">
          <div >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-black">Books List</h2>
              <ActionButton label="Add New Book" onClick={setShowNewBookForm} />
            </div>
            <div className="overflow-x-auto shadow-sm border-b border-gray-200 rounded-md">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-gray-500 border-b border-gray-200">
                    <th className="pb-2">Book ID</th>
                    <th className="pb-2">Title</th>
                    <th className="pb-2">Author</th>
                    <th className="pb-2">Availability</th>
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
                      <td className="py-2">{book.availability?"Yes":"No"}</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <SeeAllButton func={seeAllBooks} text={allBooks.length===parseInt(import.meta.env.VITE_LIMIT)?"See all":"Less"} />
          </div>
        </div>
      }
      {
        landing &&
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">All collection...</h2>
          <div className="flex gap-4 overflow-x-auto">
            {allBooks.map((book) => (
              <BookCard book={book} key={book.bookId} />
            ))}
          </div>
        </div>
      }
    </div>
  );
};

export default BookList;
