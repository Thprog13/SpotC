import React, { useState } from "react";
import { metroLines, metroDetails } from "./metroData";

const Metro = () => {
  const [activeLine, setActiveLine] = useState(metroLines[0]);
  const [selectedStation, setSelectedStation] = useState(null);

  const hasIncident = (station) => {
    return ["Berri-UQAM", "Longueuil-Université-de-Sherbrooke"].includes(station);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Réseau de Métro</h1>
        <p style={styles.subtitle}>Consultez les correspondances et signalements citoyens</p>
      </header>
      
      {/* Sélecteur de ligne */}
      <div style={styles.tabContainer}>
        {metroLines.map((line) => (
          <button
            key={line.name}
            onClick={() => { setActiveLine(line); setSelectedStation(null); }}
            style={{
              ...styles.tabButton,
              backgroundColor: activeLine.name === line.name ? "rgba(255,255,255,0.05)" : "transparent",
              borderBottom: activeLine.name === line.name ? `3px solid ${line.color}` : "3px solid transparent",
              color: activeLine.name === line.name ? "white" : "#888",
            }}
          >
            <div style={{...styles.lineCircle, backgroundColor: line.color}}></div>
            {line.name.split(" ")[1]}
          </button>
        ))}
      </div>

      <div style={styles.mainContent}>
        {/* Liste des stations */}
        <div style={styles.stationList}>
          {activeLine.stations.map((station, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedStation(station)}
              style={{ 
                ...styles.stationRow, 
                backgroundColor: selectedStation === station ? "rgba(59, 130, 246, 0.1)" : "#1a1a1a",
                borderLeft: selectedStation === station ? `4px solid ${activeLine.color}` : "4px solid transparent"
              }}
            >
              <span className="material-icons" style={{ 
                color: hasIncident(station) ? "#EF4444" : activeLine.color, 
                fontSize: '18px', 
                marginRight: '12px' 
              }}>
                {hasIncident(station) ? "warning" : "radio_button_checked"}
              </span>
              <span style={{ color: hasIncident(station) ? "#EF4444" : "white" }}>{station}</span>
            </div>
          ))}
        </div>

        {/* Détails et Signalements */}
        <div style={styles.detailsColumn}>
          {selectedStation && metroDetails[selectedStation] ? (
            <div className="fade-in">
              <div style={styles.detailsHeader}>
                <h2 style={{ margin: 0 }}>{selectedStation}</h2>
                <div style={styles.lineBadge}>Ligne {activeLine.name.split(" ")[1]}</div>
              </div>

              {/* SECTION INCIDENT DYNAMIQUE */}
              <div style={{
                ...styles.incidentBox,
                borderColor: hasIncident(selectedStation) ? "#EF4444" : "#10B981",
                backgroundColor: hasIncident(selectedStation) ? "rgba(239, 68, 68, 0.05)" : "rgba(16, 185, 129, 0.05)"
              }}>
                <span className="material-icons" style={{ color: hasIncident(selectedStation) ? "#EF4444" : "#10B981" }}>
                  {hasIncident(selectedStation) ? "report_problem" : "verified"}
                </span>
                <div style={{ marginLeft: '12px' }}>
                  <div style={styles.incidentTitle}>ÉTAT DU SERVICE</div>
                  <div style={{ color: hasIncident(selectedStation) ? "#EF4444" : "#10B981", fontWeight: 'bold', fontSize: '14px' }}>
                    {hasIncident(selectedStation) ? "Signalement actif (Police ou Panne)" : "Service normal"}
                  </div>
                </div>
              </div>

              <div style={styles.infoGrid}>
                <div style={styles.infoCard}>
                  <div style={styles.cardLabel}><span className="material-icons" style={styles.cardIcon}>history_edu</span> HISTOIRE</div>
                  <p style={styles.cardText}>{metroDetails[selectedStation].history}</p>
                </div>

                <div style={styles.infoCard}>
                  <div style={styles.cardLabel}><span className="material-icons" style={styles.cardIcon}>explore</span> À PROXIMITÉ</div>
                  <div style={styles.tagContainer}>
                    {metroDetails[selectedStation].nearby?.map(item => (
                      <span key={item} style={styles.tag}>{item}</span>
                    ))}
                  </div>
                </div>

                <div style={styles.infoCard}>
                  <div style={styles.cardLabel}><span className="material-icons" style={styles.cardIcon}>directions_bus</span> CORRESPONDANCES</div>
                  <div style={styles.busContainer}>
                    {metroDetails[selectedStation].bus?.map(bus => (
                      <div key={bus} style={styles.busBadge}>{bus}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={styles.emptyState}>
              <span className="material-icons" style={{ fontSize: '48px', color: '#333', marginBottom: '15px' }}>subway</span>
              <p>Sélectionnez une station pour voir les détails et les signalements.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "30px", color: "white", width: "100%", height: "100%" },
  header: { marginBottom: "25px" },
  title: { fontSize: "28px", fontWeight: "800", marginBottom: "5px" },
  subtitle: { color: "#666", fontSize: "14px" },
  tabContainer: { display: "flex", gap: "5px", marginBottom: "20px", borderBottom: "1px solid #222" },
  tabButton: { display: "flex", alignItems: "center", gap: "10px", background: "none", border: "none", cursor: "pointer", padding: "12px 20px", fontWeight: "600" },
  lineCircle: { width: "10px", height: "10px", borderRadius: "50%" },
  mainContent: { display: "flex", gap: "20px", height: "calc(100vh - 220px)" },
  stationList: { flex: "0 0 280px", overflowY: "auto", paddingRight: "10px" },
  stationRow: { display: "flex", alignItems: "center", padding: "12px 15px", borderRadius: "10px", marginBottom: "6px", cursor: "pointer" },
  detailsColumn: { flex: 1, backgroundColor: "#161616", padding: "25px", borderRadius: "20px", border: "1px solid #222", overflowY: "auto" },
  detailsHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  lineBadge: { padding: "4px 10px", borderRadius: "20px", background: "#222", fontSize: "11px", color: "#888" },
  incidentBox: { display: "flex", alignItems: "center", padding: "15px", borderRadius: "15px", border: "1px solid", marginBottom: "20px" },
  incidentTitle: { fontSize: "10px", color: "#666", letterSpacing: "1px" },
  infoGrid: { display: "flex", flexDirection: "column", gap: "15px" },
  infoCard: { background: "rgba(255,255,255,0.02)", padding: "15px", borderRadius: "15px" },
  cardLabel: { display: "flex", alignItems: "center", gap: "8px", fontSize: "10px", fontWeight: "800", color: "#444", marginBottom: "10px" },
  cardIcon: { fontSize: "14px" },
  cardText: { fontSize: "13px", color: "#aaa", lineHeight: "1.5" },
  tagContainer: { display: "flex", flexWrap: "wrap", gap: "6px" },
  tag: { padding: "5px 12px", background: "#222", borderRadius: "8px", fontSize: "12px" },
  busContainer: { display: "flex", flexWrap: "wrap", gap: "5px" },
  busBadge: { padding: "3px 8px", background: "#333", borderRadius: "5px", fontSize: "11px", fontWeight: "800" },
  emptyState: { height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "#444" }
};

export default Metro;