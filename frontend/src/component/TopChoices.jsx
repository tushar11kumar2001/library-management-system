import { useDispatch, useSelector } from "react-redux";
import BookCard from "./BookCard";
import { useEffect } from "react";
import { topChoiceBookListThunk } from "../redux/BookListSlice";

const TopChoices = () => {
  const dispatch = useDispatch();

  const topChoicesBooks = useSelector(store => store.bookList.topChoiceBooks);
  useEffect(() => {
    dispatch(topChoiceBookListThunk());

  }, []);
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Top Choices</h2>
      <div className="flex gap-4 overflow-x-auto">
        {topChoicesBooks.map((book, index) => (
          <BookCard book={book} key={book.bookId} />
        ))}
      </div>
    </div>
  );
};

export default TopChoices;

