import React, { useState } from "react";
import { metroLines } from "./metroData";

const Metro = () => {
  const [activeLine, setActiveLine] = useState(metroLines[0]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Stations de Métro</h1>
      
      {/* Sélecteur de ligne */}
      <div style={styles.tabContainer}>
        {metroLines.map((line) => (
          <button
            key={line.name}
            onClick={() => setActiveLine(line)}
            style={{
              ...styles.tabButton,
              borderBottom: activeLine.name === line.name ? `4px solid ${line.color}` : "4px solid transparent",
              color: activeLine.name === line.name ? "#fff" : "#888"
            }}
          >
            {line.name.split(" ")[1]}
          </button>
        ))}
      </div>

      {/* Liste des stations */}
      <div style={styles.listContainer}>
        {activeLine.stations.map((station, index) => (
          <div key={index} style={styles.stationRow}>
            <div style={{ ...styles.dot, backgroundColor: activeLine.color }}></div>
            <span style={styles.stationName}>{station}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#121212",
    minHeight: "100vh",
    color: "#fff",
    fontFamily: "Arial, sans-serif"
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center"
  },
  tabContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
    backgroundColor: "#1e1e1e",
    borderRadius: "10px",
    padding: "10px"
  },
  tabButton: {
    background: "none",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "0.3s"
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  stationRow: {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    backgroundColor: "#1e1e1e",
    borderRadius: "8px",
    transition: "transform 0.2s"
  },
  dot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    marginRight: "15px"
  },
  stationName: {
    fontSize: "18px"
  }
};

export default Metro;