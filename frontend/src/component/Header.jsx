import { Bell, Settings, Search, X } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { emptySearchBooks, SearchBooksThunk } from '../redux/BookSlice';

const Header = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  const searchAction = ()=>{
    const bookName = searchInput.split(" ").join("+");
    dispatch(SearchBooksThunk(bookName));
  };
  const removeSearchAction = ()=>{
    setSearchInput("");
    dispatch(emptySearchBooks());
  }

  return (
    <header className="w-full flex items-center justify-between bg-white shadow-md p-4 px-6">

      <div className="flex items-center gap-4">
        <img src={import.meta.env.VITE_LOGO} alt="Logo" className="h-8 w-auto" />
        <h1 className="text-xl font-semibold text-gray-800">BookVault</h1>
      </div>

      <div className="flex-1 max-w-md mx-6 relative">
        <Search 
          onClick={searchAction}
          className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by name or author..."
          className="w-full px-10 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        {searchInput && (
          <X
            className="absolute right-3 top-2.5 text-gray-400 h-5 w-5 cursor-pointer hover:text-gray-600"
            onClick={removeSearchAction}
          />
        )}
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
