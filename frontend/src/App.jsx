
import AdminDashBoard from "./pages/AdminDashBoard"
import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import Main from "./component/Main";
import Render from "./component/Render";


const App = () => {

  

  return (
    <>
      <Routes>
           <Route path="/" element={<LandingPage/>}/>
           <Route path="/dashboard" element={<AdminDashBoard/>}>
              <Route index element={<Main admin={true}/>}/>
              <Route path="totalusers" element={<Render label={"Total Members"}/>}/>
              <Route path="activeusers" element={<Render label={"Active Members"}/>}/>
              <Route path="newusers" element={<Render label={"New Members"}/>}/>
              <Route path="borrowedbooks" element={<Render label={"Borrowed Books"}/>}/>
           </Route>
      </Routes>
    </>

  )
}

export default App;


