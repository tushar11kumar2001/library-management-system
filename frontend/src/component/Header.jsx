import { Bell, Settings } from 'lucide-react';

 const  Header = ()=>{
  return (
    <header className="w-full flex items-center justify-between bg-white shadow-md p-4 px-6">
      {/* Left: Logo and Dashboard */}
      <div className="flex items-center gap-4">
        <img src={import.meta.env.VITE_LOGO} alt="Logo" className="h-8 w-auto" />
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md mx-6">
        <input
          type="text"
          placeholder="Search ..."
          className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* Right: Notification and Settings */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <Bell className="h-6 w-6 text-gray-700 cursor-pointer" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">12</span>
        </div>
        <Settings className="h-6 w-6 text-gray-700 cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
