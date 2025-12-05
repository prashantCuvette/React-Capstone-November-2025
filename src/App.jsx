import { Route, Routes } from "react-router"
import Signup from "./pages/Signup"
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import Home from "./pages/Home";


const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<>Tasks</>} />
        <Route path="/notes" element={<>Notes</>} />
      </Route>
    </Routes>
  );
}

export default App
