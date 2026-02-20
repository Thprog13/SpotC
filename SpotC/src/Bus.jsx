import React, { useState } from "react";
import { stmBusData } from "./busData";

const Bus = () => {
  const [search, setSearch] = useState("");

  return (
    <div style={{ padding: "20px", color: "white", backgroundColor: "#121212", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "20px" }}>Lignes de Bus STM</h1>
      
      <input 
        type="text" 
        placeholder="Rechercher une ligne..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#1e1e1e",
          color: "white"
        }}
      />

      {Object.entries(stmBusData).map(([category, lines]) => {
        const filteredLines = lines.filter(l => 
          l.id.includes(search) || l.name.toLowerCase().includes(search.toLowerCase())
        );

        if (filteredLines.length === 0) return null;

        return (
          <div key={category} style={{ marginBottom: "30px" }}>
            <h2 style={{ color: "#3B82F6", borderBottom: "1px solid #333", paddingBottom: "10px" }}>{category}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "10px", marginTop: "15px" }}>
              {filteredLines.map(line => (
                <div key={line.id} style={{ padding: "10px", backgroundColor: "#1e1e1e", borderRadius: "8px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ 
                    backgroundColor: category.includes("Express") ? "#ef4444" : "#3B82F6", 
                    padding: "5px 10px", 
                    borderRadius: "4px", 
                    fontWeight: "bold",
                    minWidth: "40px",
                    textAlign: "center"
                  }}>
                    {line.id}
                  </div>
                  <span style={{ fontSize: "14px" }}>{line.name}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Bus;