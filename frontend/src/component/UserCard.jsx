import React from 'react';
import { User as UserIcon } from 'lucide-react';

const UserCard = ({ user }) => {
  return (
    <div className="w-md border-4 border-gray-500 mb-5 bg-white rounded-2xl shadow-md p-4 flex items-center space-x-4">
      <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full">
        <UserIcon className="w-8 h-8 text-gray-500" />
      </div>
      <div>
        <p className="text-sm text-gray-500">User ID: {user.userId}</p>
        <h2 className="text-lg font-semibold text-gray-800">{user.fullName}</h2>
        <p className="text-sm text-gray-600">{user.emailId}</p>
        <p className="text-sm text-gray-500">Dept: {user.department}</p>
      </div>
    </div>
  );
};

export default UserCard;
