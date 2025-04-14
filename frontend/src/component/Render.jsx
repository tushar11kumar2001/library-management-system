import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import UserCard from './UserCard';
import BookCard from './BookCard';
import DialogBox from './DialogBox';

const Render = ({ label }) => {
  const [open, setOpen] = useState(false);
  const [bookDetail, setBookDetail] = useState({});

  const { totalUsers, activeUsers, newUsers } = useSelector(store => store.userList);
  const { borrowedBooks } = useSelector(store => store.bookList);
  const users = label === "Total Members" ? totalUsers : label === "New Members" ? newUsers : label === "Active Members" ? activeUsers : [];

  const closeAction = () => {
    setOpen(false);
  }
  return (
    <div className="p-5">
      <h1 className='text-3xl mb-4'>{label}</h1>
      <DialogBox
        bookFlag={true}
        open={open}
        bookDetails={bookDetail}
        onClose={closeAction}
        label="Book Details"
        heading="Book Information"
        subHeading="Borrower Details" />

      {
        label !== "Borrowed Books" &&
        <div className="grid grid-cols-3">
          {
            users?.map((user) => <UserCard user={user} key={user.userId} />)
          }

        </div>
      }
      {label === "Borrowed Books" &&
        <div className="flex gap-4 overflow-x-auto">
          {
            borrowedBooks?.map((book) => <BookCard book={book} key={book.bookId} setOpen={setOpen} setBookDetail={setBookDetail} />)
          }
        </div>
      }
    </div>
  )
}

export default Render;
