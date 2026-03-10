import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Welcome from "./pages/Welcome"
import Login from "./pages/Login"
import Tasks from "./pages/Tasks"
import { Toaster } from 'react-hot-toast';
import Register from "./pages/Register";

function App() {

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Router>
        <Routes>
          <Route path="/" element={<Welcome/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/tasks" element={<Tasks/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
