import StatCard from '../component/StatCard';
import UserList from '../component/UserList';
import BookList from '../component/BookList';
import TopChoices from '../component/TopChoices';
import WelcomeCard from '../component/WelcomeCard';

import { Users, BookOpen, Clock, UserPlus } from 'lucide-react';
import SearchBooks from './SearchBooks';

const Main = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-6 space-y-6">
        {/* Greeting Section */}
        <WelcomeCard name="Arafat" role="Admin" />

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<Users />} value="1223" label="Total Visitors" color="bg-pink-500" />
          <StatCard icon={<BookOpen />} value="740" label="Borrowed Books" color="bg-blue-500" />
          <StatCard icon={<Clock />} value="22" label="Overdue Books" color="bg-yellow-500" />
          <StatCard icon={<UserPlus />} value="60" label="New Members" color="bg-green-500" />
          <StatCard icon={<Users />} value="210" label="Active Users" color="bg-purple-500" />
        </div>

        {/* User & Book List */}
        <SearchBooks/>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserList />
          <BookList />
        </div>

        {/* Top Choices */}
        <div className="pt-2">
          <TopChoices />
        </div>
      </main>
    </div>
  );
};

export default Main;
