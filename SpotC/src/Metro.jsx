import React, { useState, useEffect } from "react";
import { metroLines, metroDetails } from "./metroData";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

const Metro = () => {
  const [activeLine, setActiveLine] = useState(metroLines[0]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [activeSignalements, setActiveSignalements] = useState({});

  // 1. LIVE FIREBASE CONNECTION (NO FAKE DATA)
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "signalements"),
      (snapshot) => {
        const now = new Date();
        const validSignalements = {};

        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.createdAt) {
            const diffMinutes = (now - data.createdAt.toDate()) / (1000 * 60);
            // Keep only real incidents reported in the last 30 mins
            if (diffMinutes <= 30) validSignalements[data.station] = data;
          }
        });
        setActiveSignalements(validSignalements);
      },
    );
    return () => unsubscribe();
  }, []);

  // 2. CHECK AGAINST FIREBASE STATE ONLY
  const hasIncident = (station) => !!activeSignalements[station];
  const getIncidentData = (station) => activeSignalements[station];

  const styles = {
    // Changed height from 100vh to 100% so it plays nicely with your Sidebar/Navbar
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      backgroundColor: "#000",
      color: "#fff",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    topSection: { padding: "20px 20px 0 20px", zIndex: 10, flexShrink: 0 },
    title: { margin: 0, fontSize: "28px", fontWeight: "800" },
    subtitle: { margin: "5px 0 15px 0", color: "#888", fontSize: "14px" },
    pillContainer: {
      display: "flex",
      gap: "10px",
      overflowX: "auto",
      paddingBottom: "15px",
      scrollbarWidth: "none",
    },
    pillButton: (isActive, color) => ({
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 20px",
      borderRadius: "25px",
      border: "none",
      cursor: "pointer",
      fontWeight: "700",
      fontSize: "15px",
      whiteSpace: "nowrap",
      transition: "all 0.2s ease",
      backgroundColor: isActive ? color : "#1e1e1e",
      color: isActive ? "#fff" : "#aaa",
      boxShadow: isActive ? `0 4px 10px ${color}40` : "none",
    }),
    contentArea: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#121212",
      borderTopLeftRadius: "25px",
      borderTopRightRadius: "25px",
      overflow: "hidden",
      position: "relative",
    },

    // VISUAL BUG FIX: We add a huge bottom padding when a station is clicked so you can still scroll the timeline behind the popup!
    stationList: {
      flex: 1,
      overflowY: "auto",
      padding: "20px",
      paddingBottom: selectedStation ? "250px" : "20px",
    },

    timelineWrapper: { position: "relative", paddingLeft: "15px" },
    timelineLine: {
      position: "absolute",
      left: "22px",
      top: "20px",
      bottom: "20px",
      width: "4px",
      backgroundColor: activeLine.color,
      borderRadius: "2px",
      zIndex: 1,
    },

    stationRow: (isSelected) => ({
      display: "flex",
      alignItems: "center",
      padding: "15px 0",
      cursor: "pointer",
      position: "relative",
      zIndex: 2,
      backgroundColor: isSelected ? "rgba(255,255,255,0.05)" : "transparent",
      borderRadius: "10px",
      margin: "0 -10px",
      paddingLeft: "10px",
      transition: "background-color 0.2s",
    }),
    stationNode: (incident) => ({
      width: "18px",
      height: "18px",
      borderRadius: "50%",
      backgroundColor: incident ? "#ef4444" : "#000",
      border: `4px solid ${incident ? "#ef4444" : activeLine.color}`,
      marginRight: "20px",
      zIndex: 3,
      boxShadow: incident ? "0 0 10px #ef4444" : "none",
    }),
    stationName: (incident) => ({
      fontSize: "17px",
      fontWeight: "600",
      color: incident ? "#ef4444" : "#fff",
    }),

    // VISUAL BUG FIX: Added zIndex: 100 so it always sits on top of everything.
    detailsSheet: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "#1e1e1e",
      borderTopLeftRadius: "20px",
      borderTopRightRadius: "20px",
      padding: "25px",
      boxShadow: "0 -10px 40px rgba(0,0,0,0.9)",
      transform: selectedStation ? "translateY(0)" : "translateY(100%)",
      transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      maxHeight: "60vh",
      overflowY: "auto",
      zIndex: 100,
    },
    closeBtn: {
      position: "absolute",
      top: "15px",
      right: "15px",
      background: "#333",
      border: "none",
      borderRadius: "50%",
      width: "30px",
      height: "30px",
      color: "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 101,
    },
    incidentBox: {
      display: "flex",
      alignItems: "center",
      padding: "12px 15px",
      borderRadius: "12px",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      border: "1px solid rgba(239, 68, 68, 0.3)",
      marginBottom: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.topSection}>
        <h1 style={styles.title}>Réseau Métro</h1>
        <p style={styles.subtitle}>
          Sélectionnez une ligne pour voir le statut
        </p>

        <div style={styles.pillContainer}>
          {metroLines.map((line) => (
            <button
              key={line.name}
              onClick={() => {
                setActiveLine(line);
                setSelectedStation(null);
              }}
              style={styles.pillButton(
                activeLine.name === line.name,
                line.color,
              )}
            >
              Ligne {line.name.split(" ")[1]}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.contentArea}>
        {/* Map Timeline View */}
        <div style={styles.stationList}>
          <div style={styles.timelineWrapper}>
            <div style={styles.timelineLine}></div>
            {activeLine.stations.map((station, index) => {
              const incident = getIncidentData(station);
              const isSelected = selectedStation === station;

              return (
                <div
                  key={index}
                  style={styles.stationRow(isSelected)}
                  onClick={() => setSelectedStation(station)}
                >
                  <div style={styles.stationNode(incident)}></div>
                  <div>
                    <div style={styles.stationName(incident)}>{station}</div>
                    {incident && (
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#ef4444",
                          marginTop: "2px",
                          fontWeight: "bold",
                        }}
                      >
                        ⚠️ {incident.type} signalé
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Popup Bottom Sheet for Station Details */}
        <div style={styles.detailsSheet}>
          {selectedStation && metroDetails[selectedStation] && (
            <>
              <button
                style={styles.closeBtn}
                onClick={() => setSelectedStation(null)}
              >
                ✕
              </button>
              <h2 style={{ margin: "0 0 20px 0", fontSize: "24px" }}>
                {selectedStation}
              </h2>

              {/* REAL FIREBASE INCIDENT ALERTS */}
              {hasIncident(selectedStation) && (
                <div style={styles.incidentBox}>
                  <span
                    className="material-icons"
                    style={{
                      color: "#ef4444",
                      marginRight: "10px",
                      fontSize: "24px",
                    }}
                  >
                    report_problem
                  </span>
                  <div>
                    <div
                      style={{
                        color: "#ef4444",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      Signalement actif: {getIncidentData(selectedStation).type}
                    </div>
                    {getIncidentData(selectedStation).description && (
                      <div
                        style={{
                          color: "#fca5a5",
                          fontSize: "13px",
                          marginTop: "2px",
                        }}
                      >
                        "{getIncidentData(selectedStation).description}"
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STATIC STATION DATA */}
              <div style={{ marginBottom: "20px" }}>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "800",
                    color: "#888",
                    marginBottom: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span className="material-icons" style={{ fontSize: "16px" }}>
                    history_edu
                  </span>{" "}
                  HISTOIRE
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#ccc",
                    lineHeight: "1.5",
                    margin: 0,
                  }}
                >
                  {metroDetails[selectedStation].history}
                </p>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "800",
                    color: "#888",
                    marginBottom: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span className="material-icons" style={{ fontSize: "16px" }}>
                    directions_bus
                  </span>{" "}
                  CORRESPONDANCES BUS
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {metroDetails[selectedStation].bus?.map((bus) => (
                    <div
                      key={bus}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#333",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: "700",
                      }}
                    >
                      {bus}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Metro;
