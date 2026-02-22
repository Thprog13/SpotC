import React, { useState } from "react";
import { metroLines, metroDetails } from "./metroData";

const Metro = () => {
  const [activeLine, setActiveLine] = useState(metroLines[0]);
  const [selectedStation, setSelectedStation] = useState(null);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Stations de Métro</h1>
      
      {/* Sélecteur de ligne */}
      <div style={styles.tabContainer}>
        {metroLines.map((line) => (
          <button
            key={line.name}
            onClick={() => { setActiveLine(line); setSelectedStation(null); }}
            style={{
              ...styles.tabButton,
              borderBottom: activeLine.name === line.name ? `4px solid ${line.color}` : "4px solid transparent",
            }}
          >
            {line.name.split(" ")[1]}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        {/* Liste des stations */}
        <div style={{ flex: 1 }}>
          {activeLine.stations.map((station, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedStation(station)}
              style={{ ...styles.stationRow, border: selectedStation === station ? "1px solid #3B82F6" : "none" }}
            >
              <div style={{ ...styles.dot, backgroundColor: activeLine.color }}></div>
              <span>{station}</span>
            </div>
          ))}
        </div>

        {/* Détails à droite */}
        <div style={styles.detailsBox}>
          {selectedStation && metroDetails[selectedStation] ? (
            <div>
              <h2 style={{ color: activeLine.color }}>{selectedStation}</h2>
              <p><strong>📜 Histoire:</strong> {metroDetails[selectedStation].history}</p>
              <p><strong>📍 À proximité:</strong> {metroDetails[selectedStation].nearby?.join(", ")}</p>
              <p><strong>🚌 Bus:</strong> {metroDetails[selectedStation].bus?.join(", ")}</p>
              {metroDetails[selectedStation].travaux && (
                <p style={{ color: "#f97316" }}><strong>⚠️ Travaux:</strong> {metroDetails[selectedStation].travaux}</p>
              )}
            </div>
          ) : (
            <p>Cliquez sur une station pour voir les détails.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "20px", color: "white", marginLeft: "20px" },
  title: { marginBottom: "20px" },
  tabContainer: { display: "flex", gap: "10px", marginBottom: "20px" },
  tabButton: { background: "none", border: "none", color: "white", cursor: "pointer", padding: "10px" },
  stationRow: { display: "flex", alignItems: "center", padding: "10px", backgroundColor: "#1e1e1e", marginBottom: "5px", cursor: "pointer", borderRadius: "5px" },
  dot: { width: "10px", height: "10px", borderRadius: "50%", marginRight: "10px" },
  detailsBox: { flex: 1, backgroundColor: "#1e1e1e", padding: "20px", borderRadius: "10px", height: "fit-content" }
};

export default Metro;