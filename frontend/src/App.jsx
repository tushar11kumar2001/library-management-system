
import { useDispatch } from "react-redux";
import AdminDashBoard from "./pages/AdminDashBoard"
import { BookListThunk } from "./redux/BookListSlice"
import { useEffect } from "react";




const App = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(BookListThunk());
  },[])

  return (
    <div className="text-red-600 bg-yellow-400">
     <AdminDashBoard/>
    </div>
  )
}

export default App


