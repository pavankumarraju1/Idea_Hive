//import toast from "react-hot-toast";

import { Route, Routes, BrowserRouter } from "react-router-dom"



import Loginpage from "./pages/LoginPage" 
import Homepage from "./pages/Homepage"
import SignupPage from "./pages/SignupPage"
import LandingPage from "./pages/LandingPage"
import { Toaster } from "react-hot-toast"
import ProfileDetails from "./pages/ProfileDetails"
import LogoutPage from "./pages/LogoutPage";
import ProfileUpdateForm from "./pages/ProfileUpdateForm";
import Body from "./pages/Body";
import CreateBlog from "./pages/createBlog"
import AllBlogsShow from "./pages/AllBlogsShow"
import IndividualBlogShow from "./pages/IndividualBlogShow"


function App() {
 
  return (
    <div className="min-h-screen bg-sky-950 text-white">
    <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/home" element={<Homepage />}></Route>
            <Route path="/login" element={<Loginpage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/logout" element={<LogoutPage />}></Route>
            <Route path="/land" element={<LandingPage />}></Route>
            <Route path="/profile" element={<ProfileDetails />}></Route>
            <Route path="/form" element={<ProfileUpdateForm />}></Route>
            <Route path="/createblog" element={<CreateBlog />}></Route>
            <Route path="/blogs" element={<AllBlogsShow />}></Route>
            <Route path="/blog/:id" element={<IndividualBlogShow />}></Route>
          </Route>
        </Routes>
    </BrowserRouter>
        
      <Toaster position="bottom-right" />
    </div>
  )
}

export default App