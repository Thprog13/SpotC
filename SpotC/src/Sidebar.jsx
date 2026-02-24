import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth"; // Import signOut
import { auth } from "./firebase";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
    }
  };

  return (
    <nav style={styles.sidebar}>
      {/* ... keep existing top icons ... */}
      <div style={styles.topIcons}>
        <div style={styles.brandBadge}>S</div>
        <Link to="/home" style={styles.link}>
            <div style={{...styles.iconWrapper, backgroundColor: isActive("/home") ? "rgba(59, 130, 246, 0.2)" : "transparent", color: isActive("/home") ? "#3B82F6" : "#888"}}>
                <span className="material-icons">home</span>
            </div>
        </Link>
        {/* ... other navigation links ... */}
      </div>

      <div style={styles.bottomIcons}>
        {/* Logout Button */}
        <div onClick={handleLogout} style={{ ...styles.iconWrapper, color: "#888", cursor: "pointer" }} title="Déconnexion">
          <span className="material-icons">logout</span>
        </div>
        
        <Link to="/login" style={styles.link}>
          <div style={{ ...styles.iconWrapper, color: isActive("/login") ? "#3B82F6" : "#888" }}>
            <span className="material-icons">account_circle</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};
// ... keep existing styles ...