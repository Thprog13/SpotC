import React, { useState, useEffect } from "react";
import { stmBusData } from "./busData";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "./firebase";

const Bus = () => {
  const [search, setSearch] = useState("");
  const [liveData, setLiveData] = useState({});
  const [loadingLive, setLoadingLive] = useState(true);

  useEffect(() => {
    const fetchLiveBusData = async () => {
      try {
        const functions = getFunctions(app);
        const getTransitUpdates = httpsCallable(functions, "getTransitUpdates");
        const result = await getTransitUpdates();

        const routeStatus = {};
        result.data.data.forEach((entity) => {
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
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      backgroundColor: "#000",
      color: "#fff",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    topSection: { padding: "20px 20px 10px 20px", zIndex: 10 },
    headerRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: "20px",
    },
    title: { margin: 0, fontSize: "28px", fontWeight: "800" },
    subtitle: { margin: "5px 0 0 0", color: "#888", fontSize: "14px" },
    liveIndicator: {
      fontSize: "12px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      backgroundColor: loadingLive ? "#222" : "rgba(74, 222, 128, 0.15)",
      color: loadingLive ? "#888" : "#4ade80",
      padding: "6px 12px",
      borderRadius: "20px",
      fontWeight: "700",
    },
    searchBarWrapper: { position: "relative", marginBottom: "10px" },
    searchIcon: {
      position: "absolute",
      left: "15px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#888",
      fontSize: "20px",
    },
    searchBar: {
      width: "100%",
      padding: "16px 16px 16px 45px",
      borderRadius: "25px",
      border: "none",
      backgroundColor: "#1e1e1e",
      color: "#fff",
      fontSize: "16px",
      outline: "none",
      boxSizing: "border-box",
      boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
    },
    listContainer: {
      flex: 1,
      overflowY: "auto",
      padding: "10px 0 40px 0",
      backgroundColor: "#121212",
      borderTopLeftRadius: "25px",
      borderTopRightRadius: "25px",
      marginTop: "10px",
      boxShadow: "0 -4px 15px rgba(0,0,0,0.5)",
    },
    categoryTitle: {
      padding: "15px 20px 5px 20px",
      fontSize: "14px",
      fontWeight: "700",
      color: "#888",
      textTransform: "uppercase",
      letterSpacing: "1px",
      position: "sticky",
      top: 0,
      backgroundColor: "#121212",
      zIndex: 5,
    },
    busRow: {
      display: "flex",
      alignItems: "center",
      padding: "16px 20px",
      borderBottom: "1px solid #222",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    busBadge: (color) => ({
      backgroundColor: color,
      color: "#fff",
      width: "55px",
      height: "40px",
      borderRadius: "8px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "20px",
      fontWeight: "800",
      marginRight: "15px",
      flexShrink: 0,
    }),
    busInfo: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    busName: {
      fontSize: "17px",
      fontWeight: "700",
      marginBottom: "4px",
      color: "#fff",
    },
    directionRow: { display: "flex", gap: "6px", flexWrap: "wrap" },
    directionTag: {
      fontSize: "11px",
      backgroundColor: "#2a2a2a",
      padding: "3px 8px",
      borderRadius: "12px",
      color: "#aaa",
      fontWeight: "600",
    },
    statusBadge: (statusType) => ({
      fontSize: "12px",
      fontWeight: "700",
      padding: "4px 8px",
      borderRadius: "6px",
      backgroundColor:
        statusType === "active"
          ? "rgba(74, 222, 128, 0.15)"
          : "rgba(239, 68, 68, 0.15)",
      color: statusType === "active" ? "#4ade80" : "#f87171",
      display: "flex",
      alignItems: "center",
      gap: "4px",
    }),
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
        <div key={category}>
          <div style={styles.categoryTitle}>{category}</div>
          <div>
            {filteredLines.map((bus) => {
              const status = liveData[bus.id];
              let statusType = "none";
              if (status) {
                if (status.canceled > 0) statusType = "warning";
                else if (status.active > 0) statusType = "active";
              }

              return (
                <div
                  key={bus.id}
                  style={styles.busRow}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#1e1e1e")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <div style={styles.busBadge(color)}>{bus.id}</div>

                  <div style={styles.busInfo}>
                    <div style={styles.busName}>{bus.name}</div>
                    <div style={styles.directionRow}>
                      {bus.dir.map((d, i) => (
                        <span key={i} style={styles.directionTag}>
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  {!loadingLive && statusType !== "none" && (
                    <div style={styles.statusBadge(statusType)}>
                      {statusType === "warning"
                        ? `⚠️ ${status.canceled}`
                        : `📡 ${status.active}`}
                    </div>
                  )}
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
      <div style={styles.topSection}>
        <div style={styles.headerRow}>
          <div>
            <h1 style={styles.title}>Réseau Bus</h1>
            <p style={styles.subtitle}>Toutes les lignes STM</p>
          </div>
          <div style={styles.liveIndicator}>
            {loadingLive ? "⏳ Connexion..." : "🟢 En direct"}
          </div>
        </div>

        <div style={styles.searchBarWrapper}>
          <span className="material-icons" style={styles.searchIcon}>
            search
          </span>
          <input
            type="text"
            placeholder="Rechercher une ligne..."
            style={styles.searchBar}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div style={styles.listContainer}>{renderCategories()}</div>
    </div>
  );
};

export default Bus;
