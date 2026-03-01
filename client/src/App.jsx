import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Welcome from "./pages/Welcome"
import Login from "./pages/Login"
import Tasks from "./pages/Tasks"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/tasks" element={<Tasks/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
