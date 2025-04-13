import React from 'react'
import { useSelector } from 'react-redux';
import UserCard from './UserCard';
import BookCard from './BookCard';

const Render = ({ label }) => {

  const { totalUsers, activeUsers, newUsers } = useSelector(store => store.userList);
  const { borrowedBooks } = useSelector(store => store.bookList);
  const users = label === "Total Members" ? totalUsers : label === "New Members" ? newUsers : label === "Active Members" ? activeUsers : [];

  return (
    <div className="p-5">
      <h1 className='text-3xl mb-4'>{label}</h1>
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
            borrowedBooks?.map((book) => <BookCard book={book} key={book.bookId} />)
          }
        </div>
      }
    </div>
  )
}

export default Render;
