import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import Metro from "./Metro";
import Bus from "./Bus";

function App() {
  return (
    <div style={{ 
      display: "flex", 
      backgroundColor: "#121212", 
      height: "100vh", 
      width: "100vw", 
      overflow: "hidden" 
    }}>
      <Sidebar />

      <main style={{ 
          flex: 1, 
          marginLeft: "68px", // Correspond à la largeur de la Sidebar
          position: "relative",
          height: "100vh",
          overflow: "hidden" 
        }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/metro" element={<Metro />} />
          <Route path="/bus" element={<Bus />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;