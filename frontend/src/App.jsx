
import { useDispatch } from "react-redux";
import AdminDashBoard from "./pages/AdminDashBoard"
import { useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";


const App = () => {

  useEffect(() => {
  }, [])

  return (
    <>
      <Routes>
           <Route path="/" element={<LandingPage/>}/>
           <Route path="/admindashboard" element={<AdminDashBoard/>}/>
      </Routes>
    </>

  )
}

export default App;


