import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "./App.css";

const createIcon = (color, iconName, size = 32) =>
  L.divIcon({
    className: "custom-div-icon",
    html: `<div class="marker-pin" style="border-color: ${color}; background: #1a1a1a;">
      <span class="material-icons" style="color: ${color}; font-size: 18px;">${iconName}</span>
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });

const metroLinesData = [
  { name: "Verte", color: "#00884c", status: "En service", positions: [[45.446, -73.591], [45.515, -73.561], [45.566, -73.539]] },
  { name: "Orange", color: "#ef8222", status: "Ralentissements", positions: [[45.524, -73.682], [45.487, -73.585], [45.515, -73.561], [45.558, -73.667]] },
  { name: "Bleue", color: "#0097d7", status: "En service", positions: [[45.485, -73.627], [45.510, -73.610], [45.559, -73.599]] },
  { name: "Jaune", color: "#f5d523", status: "Interruption", positions: [[45.515, -73.561], [45.519, -73.532], [45.525, -73.522]] },
];

const busLinesData = [
  { number: "121", name: "Sauvé / Côte-Vertu", eta: "4", color: "#3B82F6" },
  { number: "139", name: "Pie-IX", eta: "8", color: "#10B981" },
  { number: "427", name: "St-Joseph Express", eta: "12", color: "#EF4444" },
];

function MapController({ centerPos }) {
  const map = useMap();
  useEffect(() => { map.setView(centerPos, 12); }, [centerPos, map]);
  return null;
}

export default function Home() {
  const [center] = useState([45.515, -73.58]);

  return (
    <div className="home-container">
      <div className="top-glass-header">
        <div className="header-text">
          <h2>SpotC</h2>
          <p>Réseau STM en direct</p>
        </div>
        <div className="header-actions">
          <button className="icon-btn action-locate"><span className="material-icons">my_location</span></button>
          <button className="icon-btn action-report" onClick={() => alert("Signalement")}><span className="material-icons">report_problem</span></button>
        </div>
      </div>

      <div className="map-wrapper">
        <MapContainer center={center} zoom={12} zoomControl={false} style={{ height: "100%", width: "100%" }}>
          <MapController centerPos={center} />
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          {metroLinesData.map((line, idx) => (
            <Polyline key={idx} positions={line.positions} pathOptions={{ color: line.color, weight: 5, opacity: 0.7 }} />
          ))}
          <Marker position={center} icon={createIcon("#3B82F6", "person_pin")} />
        </MapContainer>
      </div>

      <div className="bottom-info-panel">
        <div className="drag-handle"></div>
        <div className="info-section">
          <h3 className="section-title">Prochains passages</h3>
          {busLinesData.map((bus, idx) => (
            <div key={idx} className="bus-card">
              <div className="bus-info-group">
                <div className="bus-badge" style={{ backgroundColor: bus.color }}>{bus.number}</div>
                <span className="bus-name">{bus.name}</span>
              </div>
              <div className="bus-eta"><span className="eta-num">{bus.eta}</span><span className="eta-unit">min</span></div>
            </div>
          ))}
        </div>
        <div className="info-section">
          <h3 className="section-title">Statut Métro</h3>
          <div className="metro-grid">
            {metroLinesData.map((line, idx) => (
              <div key={idx} className="metro-card">
                <div className="metro-line-dot" style={{ backgroundColor: line.color }}></div>
                <span className="metro-name">{line.name}</span>
                <span className="metro-status" style={{ color: line.status === "En service" ? "#10B981" : "#F97316" }}>{line.status === "En service" ? "OK" : "!"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}