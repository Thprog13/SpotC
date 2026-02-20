import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Login from "./Login";
import Metro from "./Metro";
import Bus from "./Bus"; 

function App() {
  return (
    <div style={{ display: "flex", backgroundColor: "#121212", minHeight: "100vh" }}>
      <Sidebar />
      
      <main style={{ 
        flex: 1, 
        marginLeft: "60px", 
        height: "100vh", 
        position: "relative",
        overflow: "auto" 
      }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/metro" element={<Metro />} />
          {/* AJOUTE CETTE LIGNE CI-DESSOUS */}
          <Route path="/bus" element={<Bus />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;