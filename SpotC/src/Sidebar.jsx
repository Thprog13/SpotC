import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.sidebar}>
      <div style={styles.topIcons}>
        <div style={styles.brandBadge}>S</div>
        <Link to="/home" style={styles.link}>
          <div
            style={{
              ...styles.iconWrapper,
              backgroundColor: isActive("/home")
                ? "rgba(59, 130, 246, 0.2)"
                : "transparent",
              color: isActive("/home") ? "#3B82F6" : "#888",
            }}
          >
            <span className="material-icons">home</span>
          </div>
        </Link>
        <Link to="/metro" style={styles.link}>
          <div
            style={{
              ...styles.iconWrapper,
              backgroundColor: isActive("/metro")
                ? "rgba(59, 130, 246, 0.2)"
                : "transparent",
              color: isActive("/metro") ? "#3B82F6" : "#888",
            }}
          >
            <span className="material-icons">directions_subway</span>
          </div>
        </Link>
        <Link to="/bus" style={styles.link}>
          <div
            style={{
              ...styles.iconWrapper,
              backgroundColor: isActive("/bus")
                ? "rgba(59, 130, 246, 0.2)"
                : "transparent",
              color: isActive("/bus") ? "#3B82F6" : "#888",
            }}
          >
            <span className="material-icons">directions_bus</span>
          </div>
        </Link>
      </div>
      <div style={styles.bottomIcons}>
        <Link to="/login" style={styles.link}>
          <div
            style={{
              ...styles.iconWrapper,
              color: isActive("/login") ? "#3B82F6" : "#888",
            }}
          >
            <span className="material-icons">account_circle</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  sidebar: {
    width: "68px",
    height: "100vh",
    backgroundColor: "#121212",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 0",
    position: "fixed", // Reste en place lors du scroll
    left: 0,
    top: 0,
    borderRight: "1px solid rgba(255, 255, 255, 0.1)",
    zIndex: 9999, // Passe au-dessus de la carte et des autres éléments
  },
  brandBadge: {
    width: "40px",
    height: "40px",
    background: "linear-gradient(135deg, #3b82f6, #10b981)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  topIcons: { display: "flex", flexDirection: "column", gap: "12px" },
  iconWrapper: {
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "0.3s",
  },
  link: { textDecoration: "none", color: "inherit" },
};

export default Sidebar;
