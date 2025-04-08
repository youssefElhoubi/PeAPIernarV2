import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; 
import SignUp from "./pages/signup";
import "./App.css"
import Home from "./pages/user/Home";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="user/home" element = {<Home/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
