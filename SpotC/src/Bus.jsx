import React, { useState } from "react";
import { stmBusData } from "./busData";

const Bus = () => {
  const [search, setSearch] = useState("");

  const styles = {
    container: {
      padding: "20px",
      backgroundColor: "#121212",
      minHeight: "100vh",
      color: "#ffffff",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    header: {
      marginBottom: "30px",
      borderBottom: "1px solid #333",
      paddingBottom: "10px"
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
      transition: "border 0.3s ease"
    },
    categorySection: {
      marginTop: "25px"
    },
    categoryTitle: {
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "15px",
      display: "flex",
      alignItems: "center",
      gap: "10px"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "15px"
    },
    busCard: {
      backgroundColor: "#1e1e1e",
      borderRadius: "10px",
      padding: "15px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      border: "1px solid #2a2a2a",
      transition: "transform 0.2s, background-color 0.2s",
      cursor: "pointer"
    },
    busHeader: {
      display: "flex",
      alignItems: "center",
      gap: "12px"
    },
    busNumber: (color) => ({
      backgroundColor: color,
      color: "#fff",
      padding: "5px 10px",
      borderRadius: "6px",
      fontWeight: "bold",
      minWidth: "45px",
      textAlign: "center"
    }),
    busName: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#e0e0e0"
    },
    directionRow: {
      display: "flex",
      gap: "8px",
      marginTop: "5px"
    },
    directionTag: {
      fontSize: "11px",
      backgroundColor: "#333",
      padding: "3px 8px",
      borderRadius: "4px",
      color: "#bbb",
      textTransform: "uppercase"
    }
  };

  // Logique de filtrage (Fonctionnalité de recherche pour le Livrable 3)
  const renderCategories = () => {
    return Object.entries(stmBusData).map(([category, lines]) => {
      const filteredLines = lines.filter(line =>
        line.id.includes(search) || 
        line.name.toLowerCase().includes(search.toLowerCase())
      );

      if (filteredLines.length === 0) return null;

      // Définition des couleurs par type de réseau
      const getCategoryColor = (cat) => {
        if (cat.includes("Express")) return "#ef4444"; // Rouge Express
        if (cat.includes("Nuit")) return "#000000";    // Noir Nuit
        if (cat.includes("REM")) return "#10b981";      // Vert REM
        return "#3b82f6";                               // Bleu Standard
      };

      const color = getCategoryColor(category);

      return (
        <div key={category} style={styles.categorySection}>
          <h2 style={{ ...styles.categoryTitle, color: color }}>
            <span style={{ width: "4px", height: "24px", backgroundColor: color, borderRadius: "2px" }}></span>
            {category}
          </h2>
          <div style={styles.grid}>
            {filteredLines.map((bus) => (
              <div 
                key={bus.id} 
                style={styles.busCard}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#252525"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#1e1e1e"}
              >
                <div style={styles.busHeader}>
                  <div style={styles.busNumber(color)}>{bus.id}</div>
                  <div style={styles.busName}>{bus.name}</div>
                </div>
                <div style={styles.directionRow}>
                  {bus.dir.map((d, i) => (
                    <span key={i} style={styles.directionTag}>{d}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Réseau de Bus STM</h1>
        <p style={{ color: "#888", fontSize: "14px" }}>
          Explorez les {Object.values(stmBusData).flat().length} lignes de Montréal
        </p>
      </header>

      <input
        type="text"
        placeholder="Rechercher par numéro ou nom de rue..."
        style={styles.searchBar}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ paddingBottom: "40px" }}>
        {renderCategories()}
      </div>
    </div>
  );
};

export default Bus;