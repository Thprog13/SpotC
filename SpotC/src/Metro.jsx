import React, { useState } from "react";
import { metroLines } from "./metroData";
import { metroDetails } from "./metroData"; // Importe les détails

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
        {/* Liste des stations à gauche */}
        <div style={{ flex: 1 }}>
          {activeLine.stations.map((station, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedStation(station)}
              style={{ ...styles.stationRow, cursor: "pointer", border: selectedStation === station ? "1px solid #3B82F6" : "none" }}
            >
              <div style={{ ...styles.dot, backgroundColor: activeLine.color }}></div>
              <span>{station}</span>
            </div>
          ))}
        </div>

        {/* Panneau de détails à droite */}
        <div style={{ flex: 1, backgroundColor: "#1e1e1e", padding: "20px", borderRadius: "10px", height: "fit-content", position: "sticky", top: "20px" }}>
          {selectedStation && metroDetails[selectedStation] ? (
            <div>
              <h2 style={{ color: activeLine.color }}>{selectedStation}</h2>
              
              <section style={styles.section}>
                <h4>📜 Histoire</h4>
                <p style={styles.text}>{metroDetails[selectedStation].history}</p>
              </section>

              <section style={styles.section}>
                <h4>📍 À proximité</h4>
                <div style={styles.tagContainer}>
                  {metroDetails[selectedStation].nearby.map(place => (
                    <span key={place} style={styles.tag}>{place}</span>
                  ))}
                </div>
              </section>

              <section style={styles.section}>
                <h4>🚌 Bus en correspondance</h4>
                <div style={styles.busGrid}>
                  {metroDetails[selectedStation].bus.map(b => (
                    <span key={b} style={styles.busBadge}>{b}</span>
                  ))}
                </div>
              </section>

              <section style={styles.section}>
                <h4>⚠️ Signalements SpotC</h4>
                {metroDetails[selectedStation].signalements.length > 0 ? (
                  metroDetails[selectedStation].signalements.map((s, i) => (
                    <div key={i} style={styles.alert}>
                      <strong>{s.type} :</strong> {s.desc} ({s.time})
                    </div>
                  ))
                ) : (
                  <p style={{ color: "#888" }}>Aucun signalement en cours.</p>
                )}
              </section>
            </div>
          ) : (
            <p style={{ textAlign: "center", color: "#888" }}>Cliquez sur une station pour voir les détails.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "20px", backgroundColor: "#121212", minHeight: "100vh", color: "#fff" },
  title: { textAlign: "center", marginBottom: "30px" },
  tabContainer: { display: "flex", justifyContent: "space-around", marginBottom: "20px", backgroundColor: "#1e1e1e", borderRadius: "10px", padding: "10px" },
  tabButton: { background: "none", border: "none", color: "#fff", cursor: "pointer", padding: "10px", fontWeight: "bold" },
  stationRow: { display: "flex", alignItems: "center", padding: "12px", backgroundColor: "#1e1e1e", borderRadius: "8px", marginBottom: "8px" },
  dot: { width: "10px", height: "10px", borderRadius: "50%", marginRight: "15px" },
  section: { marginTop: "20px" },
  text: { fontSize: "14px", color: "#ccc", lineHeight: "1.4" },
  tagContainer: { display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "5px" },
  tag: { backgroundColor: "#333", padding: "4px 8px", borderRadius: "4px", fontSize: "12px" },
  busGrid: { display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "5px" },
  busBadge: { backgroundColor: "#3B82F6", color: "white", padding: "2px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold" },
  alert: { backgroundColor: "rgba(231, 76, 60, 0.1)", borderLeft: "4px solid #e74c3c", padding: "10px", marginTop: "5px", fontSize: "13px" }
};

export default Metro;