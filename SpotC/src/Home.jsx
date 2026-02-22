import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
// IMPORTATION CRUCIALE POUR FIXER L'AFFICHAGE DE LA MAP
import "leaflet/dist/leaflet.css";
import "./App.css";

// Fix pour les icônes par défaut de Leaflet qui ne s'affichent pas toujours avec Vite
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

// Contrôleur pour centrer la map dynamiquement
function MapController({ centerPos }) {
  const map = useMap();
  useEffect(() => {
    if (centerPos) {
      map.setView(centerPos, 14);
      // Force le redimensionnement pour éviter les zones grises
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }
  }, [centerPos, map]);
  return null;
}

export default function Home() {
  const [center, setCenter] = useState([45.515, -73.58]); // Montréal par défaut
  const [userPos, setUserPos] = useState(null);

  // Fonction pour obtenir la position actuelle
  const handleLocate = () => {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newPos = [position.coords.latitude, position.coords.longitude];
        setCenter(newPos);
        setUserPos(newPos);
      },
      () => {
        alert("Impossible de récupérer votre position.");
      },
    );
  };

  // Localisation automatique au chargement
  useEffect(() => {
    handleLocate();
  }, []);

  return (
    <div className="home-container">
      <div className="top-glass-header">
        <div className="header-text">
          <h2>SpotC</h2>
          <p>Réseau STM en direct</p>
        </div>
        <div className="header-actions">
          <button className="icon-btn action-locate" onClick={handleLocate}>
            <span className="material-icons">my_location</span>
          </button>
          <button
            className="icon-btn action-report"
            onClick={() => alert("Signalement")}
          >
            <span className="material-icons">report_problem</span>
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

          {/* Marqueur de l'utilisateur */}
          {userPos && (
            <Marker
              position={userPos}
              icon={createIcon("#3B82F6", "person_pin")}
            />
          )}
        </MapContainer>
      </div>

      {/* Reste du panneau d'information (Bottom Panel) */}
      <div className="bottom-info-panel">
        <div className="drag-handle"></div>
        <div className="info-section">
          <h3 className="section-title">Prochains passages</h3>
          {busLinesData.map((bus, idx) => (
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
        <div className="info-section">
          <h3 className="section-title">Statut Métro</h3>
          <div className="metro-grid">
            {metroLinesData.map((line, idx) => (
              <div key={idx} className="metro-card">
                <div
                  className="metro-line-dot"
                  style={{ backgroundColor: line.color }}
                ></div>
                <span className="metro-name">{line.name}</span>
                <span
                  className="metro-status"
                  style={{
                    color: line.status === "En service" ? "#10B981" : "#F97316",
                  }}
                >
                  {line.status === "En service" ? "OK" : "!"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
