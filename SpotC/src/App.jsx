import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Login from "./Login"; // Assure-toi d'avoir un fichier Login.jsx

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      
      <main style={{ flex: 1, marginLeft: "60px", height: "100vh", position: "relative" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;