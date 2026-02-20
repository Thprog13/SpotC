import React from "react";
import { Link } from "react-router-dom"; 

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <div style={styles.topIcons}>
        {/* Icône Home */}
        <Link to="/home" style={styles.link}>
          <div style={styles.iconWrapper}>🏠</div>
        </Link>
        
        {/* Icône Étoile -> Liste Métro */}
        <Link to="/metro" style={styles.link}>
          <div style={styles.iconWrapper}>🚇</div>
        </Link>
        
        <Link to="/bus" style={styles.link}>
          <div style={styles.iconWrapper}>🚌</div>
        </Link>
      </div>

      <div style={styles.bottomIcons}>
        <div style={{ ...styles.iconWrapper, backgroundColor: "#E1306C" }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Insta" style={styles.imgIcon} />
        </div>
        <div style={{ ...styles.iconWrapper, backgroundColor: "#5865F2" }}>
          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111370.png" alt="Discord" style={styles.imgIcon} />
        </div>
        <div style={{ ...styles.iconWrapper, backgroundColor: "#1DB954" }}>
          <img src="https://cdn-icons-png.flaticon.com/512/174/174868.png" alt="Spotify" style={styles.imgIcon} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "60px",
    height: "100vh",
    backgroundColor: "#1e1e1e",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 0",
    position: "fixed",
    left: 0,
    top: 0,
    boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
    zIndex: 1000,
  },
  topIcons: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  bottomIcons: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  iconWrapper: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "20px",
    transition: "0.3s",
    color: "#ccc",
  },
  imgIcon: {
    width: "24px",
    height: "24px",
    filter: "brightness(0) invert(1)",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  }
};

export default Sidebar;