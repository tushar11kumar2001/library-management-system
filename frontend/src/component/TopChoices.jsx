import { useDispatch, useSelector } from "react-redux";
import BookCard from "./BookCard";
import { useEffect, useState } from "react";
import { topChoiceBookListThunk } from "../redux/BookSlice";
import DialogBox from "./DialogBox";

const TopChoices = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [bookDetail, setBookDetail] = useState({});
  const topChoicesBooks = useSelector(store => store.bookList.topChoiceBooks);

  const closeAction = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(topChoiceBookListThunk());
  }, []);
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
      <h2 className="text-lg font-semibold mb-4">Top Choices</h2>
      <div className="flex gap-4 overflow-x-auto">
        {topChoicesBooks.map((book, index) => (
          <BookCard book={book} key={book.bookId} setOpen={setOpen} setBookDetail={setBookDetail} />
        ))}
      </div>
    </div>
  );
};

export default TopChoices;

