import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; 
import SignUp from "./pages/signup";
import "./App.css"
import Home from "./pages/user/Home";
import Privet from "./components/protected/Privet";
import MyOrders from "./pages/user/MyOrders";
import AddPlant from "./components/admineComponents/AddPlant";

function App() {
  return (
    <>
    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="user/home" element = {<Privet Componnet={Home} />} />
        <Route path="user/orders" element={<Privet Componnet={MyOrders}/>}/>
      </Routes>
    </BrowserRouter> */}
    <AddPlant/>
    </>
  )
}

export default App
