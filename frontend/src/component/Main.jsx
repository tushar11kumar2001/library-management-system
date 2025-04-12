import StatCard from '../component/StatCard';
import UserWithBorrowBook from './UserWithBorrowBook';
import BookList from '../component/BookList';
import TopChoices from '../component/TopChoices';
import WelcomeCard from '../component/WelcomeCard';

import { Users, BookOpen, Clock, UserPlus } from 'lucide-react';
import SearchBooks from './SearchBooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserSliceThunk } from '../redux/UserSlice';

const Main = ({
  admin,
  landing,
}) => {
  const dispatch = useDispatch();

  useEffect(()=>{
     dispatch(UserSliceThunk());
  },[]);
  const { totalUsers, activeUsers, newUsers } = useSelector( store => store.userList);
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-6 space-y-6">

        {admin && <>
          <WelcomeCard name="Arafat" role="Admin" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={<Users />} users={totalUsers} label="Total Visitors" color="bg-pink-500" />
            <StatCard icon={<BookOpen />} value="740" label="Borrowed Books" color="bg-blue-500" />
            <StatCard icon={<Clock />} value="22" label="Overdue Books" color="bg-yellow-500" />
            <StatCard icon={<UserPlus />} users={newUsers} label="New Members" color="bg-green-500" />
            <StatCard icon={<Users />} users={activeUsers} label="Active Users" color="bg-purple-500" />
          </div>

          <div className="flex gap-6 w-full">
            <UserWithBorrowBook />
            <BookList admin={admin} />
          </div>
        </>
        }
        <>
          <SearchBooks />
          <div className="pt-2">
            <TopChoices />
          </div>
        </>
        {landing &&
          <BookList landing={landing} />
        }
      </main>
    </div>
  );
};

export default Main;
