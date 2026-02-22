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
    <div
      style={{
        display: "flex",
        backgroundColor: "#121212",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {/* La Sidebar est fixe à gauche */}
      <Sidebar />

      {/* On ajoute un flex: 1 et on s'assure que la marge correspond à la largeur de la barre */}
      <main
        style={{
          flex: 1,
          marginLeft: "68px", // Doit être égal à la largeur définie dans Sidebar.jsx
          position: "relative",
          height: "100vh",
          width: "calc(100vw - 68px)",
          overflowY: "auto", // Permet le scroll vertical si le contenu dépasse
        }}
      >
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
