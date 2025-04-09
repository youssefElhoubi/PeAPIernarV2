import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; 
import SignUp from "./pages/signup";
import "./App.css"
import Home from "./pages/user/Home";
import Privet from "./components/protected/Privet";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="user/home" element = {<Privet Componnet={Home} />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
