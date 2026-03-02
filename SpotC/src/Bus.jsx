import React, { useState, useEffect } from "react";
import { stmBusData } from "./busData";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "./firebase";

const Bus = () => {
  const [search, setSearch] = useState("");
  const [liveData, setLiveData] = useState({});
  const [busPositions, setBusPositions] = useState([]); // NEW: State for GPS locations
  const [loadingLive, setLoadingLive] = useState(true);

  useEffect(() => {
    const fetchLiveBusData = async () => {
      try {
        const functions = getFunctions(app);

        // Setup both backend calls
        const getTransitUpdates = httpsCallable(functions, "getTransitUpdates");
        const getVehiclePositions = httpsCallable(
          functions,
          "getVehiclePositions",
        ); // NEW

        // Run both fetches at the same time for better speed
        const [updatesResult, positionsResult] = await Promise.all([
          getTransitUpdates(),
          getVehiclePositions(),
        ]);

        // 1. Process Status Data (Active/Canceled)
        const routeStatus = {};
        updatesResult.data.data.forEach((entity) => {
          const routeId = entity.tripUpdate?.trip?.routeId;
          const isCanceled =
            entity.tripUpdate?.trip?.scheduleRelationship === 3;
          if (routeId) {
            if (!routeStatus[routeId])
              routeStatus[routeId] = { active: 0, canceled: 0 };
            if (isCanceled) routeStatus[routeId].canceled += 1;
            else routeStatus[routeId].active += 1;
          }
        });
        setLiveData(routeStatus);

        // 2. Process GPS Locations (Ready for the map!)
        const locations = positionsResult.data.data;
        console.log("GPS Locations Ready for Map:", locations);
        setBusPositions(locations);
      } catch (error) {
        console.error("Error fetching live data:", error);
      } finally {
        setLoadingLive(false);
      }
    };

    fetchLiveBusData();
    const interval = setInterval(fetchLiveBusData, 60000);
    return () => clearInterval(interval);
  }, []);

  const styles = {
    container: {
      padding: "20px",
      backgroundColor: "#121212",
      minHeight: "100vh",
      color: "#ffffff",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    header: {
      marginBottom: "30px",
      borderBottom: "1px solid #333",
      paddingBottom: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    liveIndicator: {
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: loadingLive ? "#333" : "#064e3b",
      color: loadingLive ? "#aaa" : "#34d399",
      padding: "6px 12px",
      borderRadius: "20px",
      fontWeight: "500",
    },
    searchBar: {
      width: "100%",
      padding: "15px",
      borderRadius: "12px",
      border: "1px solid #444",
      backgroundColor: "#1e1e1e",
      color: "#fff",
      fontSize: "16px",
      outline: "none",
      transition: "border 0.3s ease",
      boxSizing: "border-box",
    },
    categorySection: {
      marginTop: "25px",
    },
    categoryTitle: {
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "15px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "15px",
    },
    busCard: {
      backgroundColor: "#1e1e1e",
      borderRadius: "10px",
      padding: "15px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      border: "1px solid #2a2a2a",
      transition: "transform 0.2s, border-color 0.2s",
      cursor: "pointer",
    },
    busHeader: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    busNumber: (color) => ({
      backgroundColor: color,
      color: "#fff",
      padding: "5px 10px",
      borderRadius: "6px",
      fontWeight: "bold",
      minWidth: "45px",
      textAlign: "center",
    }),
    busName: {
      fontSize: "15px",
      fontWeight: "500",
      color: "#e0e0e0",
      flex: 1,
    },
    bottomRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: "1px solid #333",
      paddingTop: "8px",
    },
    directionRow: {
      display: "flex",
      gap: "6px",
      flexWrap: "wrap",
    },
    directionTag: {
      fontSize: "10px",
      backgroundColor: "#333",
      padding: "3px 6px",
      borderRadius: "4px",
      color: "#bbb",
      textTransform: "uppercase",
    },
    statusBadge: (statusType) => {
      let bgColor = "#333";
      let textColor = "#aaa";

      if (statusType === "active") {
        bgColor = "rgba(16, 185, 129, 0.15)";
        textColor = "#34d399";
      } else if (statusType === "warning") {
        bgColor = "rgba(239, 68, 68, 0.15)";
        textColor = "#f87171";
      }

      return {
        fontSize: "11px",
        fontWeight: "bold",
        padding: "4px 8px",
        borderRadius: "6px",
        backgroundColor: bgColor,
        color: textColor,
        display: "flex",
        alignItems: "center",
        gap: "4px",
      };
    },
  };

  const renderCategories = () => {
    return Object.entries(stmBusData).map(([category, lines]) => {
      const filteredLines = lines.filter(
        (line) =>
          line.id.includes(search) ||
          line.name.toLowerCase().includes(search.toLowerCase()),
      );

      if (filteredLines.length === 0) return null;

      const getCategoryColor = (cat) => {
        if (cat.includes("Express")) return "#ef4444";
        if (cat.includes("Nuit")) return "#52525b";
        if (cat.includes("REM")) return "#10b981";
        return "#3b82f6";
      };

      const color = getCategoryColor(category);

      return (
        <div key={category} style={styles.categorySection}>
          <h2 style={{ ...styles.categoryTitle, color: color }}>
            <span
              style={{
                width: "4px",
                height: "24px",
                backgroundColor: color,
                borderRadius: "2px",
              }}
            ></span>
            {category}
          </h2>
          <div style={styles.grid}>
            {filteredLines.map((bus) => {
              // Get live status for this specific bus ID
              const status = liveData[bus.id];
              let statusType = "none";
              if (status) {
                if (status.canceled > 0) statusType = "warning";
                else if (status.active > 0) statusType = "active";
              }

              return (
                <div
                  key={bus.id}
                  style={styles.busCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = color;
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#2a2a2a";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={styles.busHeader}>
                    <div style={styles.busNumber(color)}>{bus.id}</div>
                    <div style={styles.busName}>{bus.name}</div>
                  </div>

                  <div style={styles.bottomRow}>
                    <div style={styles.directionRow}>
                      {bus.dir.map((d, i) => (
                        <span key={i} style={styles.directionTag}>
                          {d}
                        </span>
                      ))}
                    </div>

                    {/* LIVE STATUS BADGE */}
                    {!loadingLive && (
                      <div style={styles.statusBadge(statusType)}>
                        {statusType === "warning" &&
                          `⚠️ ${status.canceled} Canceled`}
                        {statusType === "active" &&
                          `📡 ${status.active} Active`}
                        {statusType === "none" && `⚪ No data`}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1>Réseau de Bus STM</h1>
          <p style={{ color: "#888", fontSize: "14px", marginTop: "5px" }}>
            Explorez les {Object.values(stmBusData).flat().length} lignes de
            Montréal
          </p>
        </div>

        {/* Top Right Live Indicator */}
        <div style={styles.liveIndicator}>
          {loadingLive ? "⏳ Connexion STM..." : "🟢 Temps Réel Actif"}
        </div>
      </header>

      <input
        type="text"
        placeholder="Rechercher par numéro ou nom de rue..."
        style={styles.searchBar}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ paddingBottom: "40px" }}>{renderCategories()}</div>
    </div>
  );
};

export default Bus;
