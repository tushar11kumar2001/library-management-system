import { useEffect, useState } from "react";
import ActionButton from "./ActionButton";
import SeeAllButton from "./SeeAllButton";
import { useDispatch, useSelector } from "react-redux";
import { UserWithBorrowBookThunk } from "../redux/UserSlice";

const UserWithBorrowBook = () => {
  const dispatch = useDispatch();

  const userwithBorrowedBook = useSelector(store => store.userList.userwithBorrowedBook);
  const SeeAllAction = () => {
    if (userwithBorrowedBook.length === parseInt(import.meta.env.VITE_LIMIT)) dispatch(UserWithBorrowBookThunk("all"))
    else dispatch(UserWithBorrowBookThunk(import.meta.env.VITE_LIMIT))
  }

  useEffect(() => {
    dispatch(UserWithBorrowBookThunk(import.meta.env.VITE_LIMIT));
  }, [])

  return (
    <div className="w-1/2 bg-white shadow rounded-xl p-4 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">List of those user who have issue any book</h2>
          <ActionButton label="Add New User" onClick={() => alert("Add User Clicked")} />
        </div>
        <div className="overflow-x-auto shadow-sm border-b border-gray-200 rounded-md">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500 border-b border-gray-200">
                <th className="pb-2">User ID</th>
                <th className="pb-2">User Name</th>
                <th className="pb-2">No.of Issued Books</th>
                <th className="pb-2">Department</th>
              </tr>
            </thead>
            <tbody>
              {userwithBorrowedBook?.map((u, idx) => (
                <tr
                  key={u.userId}
                  className="hover:bg-gray-50 text-black border-b border-gray-200"
                >
                  <td className="py-2">{u.userId}</td>
                  <td className="py-2">{u.fullName}</td>
                  <td className="py-2">{u.borrowedBook.length}</td>
                  <td className="py-2">{u.department}</td>
                </tr>
              )
              )
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <SeeAllButton func={SeeAllAction} text={userwithBorrowedBook?.length === parseInt(import.meta.env.VITE_LIMIT) ? "See All" : "Less"} />
      </div>
    </div>
  );
};

export default UserWithBorrowBook;
