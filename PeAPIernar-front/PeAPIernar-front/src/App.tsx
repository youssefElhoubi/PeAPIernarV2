import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; 
import SignUp from "./pages/signup";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
