import './App.css'
import Login from "./components/Login/Login"
import Signup from './components/Signup/Signup'
import { Route, Routes} from "react-router-dom";
import Home from './components/Home/Home';

function App() {
  
  return (
    <>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
