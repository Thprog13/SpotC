import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Correction de l'affichage de la map
import "./App.css";

// Fix pour les icônes Leaflet par défaut
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const createIcon = (color, iconName, size = 32) =>
  L.divIcon({
    className: "custom-div-icon",
    html: `<div class="marker-pin" style="border-color: ${color}; background: #1a1a1a; display: flex; justify-content: center; align-items: center; border: 2px solid; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); width: ${size}px; height: ${size}px;">
      <span class="material-icons" style="color: ${color}; font-size: 18px; transform: rotate(45deg);">${iconName}</span>
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
  });

const metroLinesData = [
  {
    name: "Verte",
    color: "#00884c",
    status: "En service",
    positions: [
      [45.446, -73.591],
      [45.515, -73.561],
      [45.566, -73.539],
    ],
  },
  {
    name: "Orange",
    color: "#ef8222",
    status: "Ralentissements",
    positions: [
      [45.524, -73.682],
      [45.487, -73.585],
      [45.515, -73.561],
      [45.558, -73.667],
    ],
  },
  {
    name: "Bleue",
    color: "#0097d7",
    status: "En service",
    positions: [
      [45.485, -73.627],
      [45.51, -73.61],
      [45.559, -73.599],
    ],
  },
  {
    name: "Jaune",
    color: "#f5d523",
    status: "Interruption",
    positions: [
      [45.515, -73.561],
      [45.519, -73.532],
      [45.525, -73.522],
    ],
  },
];

const busLinesData = [
  { number: "121", name: "Sauvé / Côte-Vertu", eta: "4", color: "#3B82F6" },
  { number: "139", name: "Pie-IX", eta: "8", color: "#10B981" },
  { number: "427", name: "St-Joseph Express", eta: "12", color: "#EF4444" },
];

function MapController({ centerPos }) {
  const map = useMap();
  useEffect(() => {
    if (centerPos) {
      map.setView(centerPos, 14);
      setTimeout(() => map.invalidateSize(), 100);
    }
  }, [centerPos, map]);
  return null;
}

export default function Home() {
  const [center, setCenter] = useState([45.515, -73.58]);
  const [userPos, setUserPos] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPos = [pos.coords.latitude, pos.coords.longitude];
          setCenter(newPos);
          setUserPos(newPos);
        },
        () => alert("Erreur de géolocalisation"),
      );
    }
  };

  useEffect(() => {
    handleLocate();
  }, []);

  const filteredBus = busLinesData.filter(
    (b) =>
      b.number.includes(searchQuery) ||
      b.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="home-container">
      <div className="top-glass-header">
        <div className="header-text">
          <h2>SpotC</h2>
          <p>Direct STM</p>
        </div>

        <div style={{ flex: 1, margin: "0 15px", position: "relative" }}>
          <span
            className="material-icons"
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#888",
              fontSize: "18px",
            }}
          >
            search
          </span>
          <input
            type="text"
            placeholder="Rechercher une ligne ou une station..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 10px 8px 35px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              color: "white",
              outline: "none",
            }}
          />
        </div>

        <div className="header-actions">
          <button className="icon-btn action-locate" onClick={handleLocate}>
            <span className="material-icons">my_location</span>
          </button>
        </div>
      </div>

      <div className="map-wrapper">
        <MapContainer
          center={center}
          zoom={12}
          zoomControl={false}
          style={{ height: "100%", width: "100%" }}
        >
          <MapController centerPos={center} />
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          {metroLinesData.map((line, idx) => (
            <Polyline
              key={idx}
              positions={line.positions}
              pathOptions={{ color: line.color, weight: 5, opacity: 0.7 }}
            />
          ))}
          {userPos && (
            <Marker
              position={userPos}
              icon={createIcon("#3B82F6", "person_pin")}
            />
          )}
        </MapContainer>
      </div>

      <div className="bottom-info-panel">
        <div className="drag-handle"></div>
        <div className="info-section">
          <h3 className="section-title">Passages ({filteredBus.length})</h3>
          {filteredBus.map((bus, idx) => (
            <div key={idx} className="bus-card">
              <div className="bus-info-group">
                <div
                  className="bus-badge"
                  style={{ backgroundColor: bus.color }}
                >
                  {bus.number}
                </div>
                <span className="bus-name">{bus.name}</span>
              </div>
              <div className="bus-eta">
                <span className="eta-num">{bus.eta}</span>
                <span className="eta-unit">min</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
