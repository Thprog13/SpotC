import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "./App.css";

// --- ICONS & CONFIG ---
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const createIcon = (color, iconName, size = 36) =>
  L.divIcon({
    className: "custom-div-icon",
    html: `<div class="marker-pin" style="border-color: ${color}; background: #222;">
    <span class="material-icons" style="color: ${color}; font-size: 20px;">${iconName}</span>
  </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });

//const stationDotIcon = L.divIcon({
//  className: "station-div",
//  html: `<div class="station-dot"></div>`,
//  iconSize: [14, 14],
//  iconAnchor: [7, 7],
//});

// --- DATA ---
const stmLines = [
  {
    color: "#10B981",
    positions: [
      [45.515, -73.561],
      [45.525, -73.553],
      [45.541, -73.543],
    ],
  },
  {
    color: "#F97316",
    positions: [
      [45.515, -73.561],
      [45.524, -73.581],
      [45.531, -73.599],
    ],
  },
  {
    color: "#3B82F6",
    positions: [
      [45.508, -73.555],
      [45.52, -73.57],
      [45.535, -73.6],
    ],
  },
  {
    color: "#EC4899",
    positions: [
      [45.495, -73.578],
      [45.51, -73.6],
      [45.525, -73.62],
    ],
  },
];

const nearbyLines = [
  {
    number: "129",
    dir: "South",
    stop: "Côte-Sainte-Catherine",
    eta: "0",
    colorClass: "color-blue",
  },
  {
    number: "161",
    dir: "West",
    stop: "Van Horne / Darlington",
    eta: "0",
    colorClass: "color-pink",
  },
  {
    number: "1",
    dir: "Green",
    stop: "Station Berri-UQAM",
    eta: "2",
    colorClass: "color-green",
  },
];

const reportsData = [
  {
    id: 1,
    station: "Berri-UQAM",
    desc: "Control Agents at exit",
    time: "2m ago",
    color: "#3B82F6",
    icon: "local_police",
  },
  {
    id: 2,
    station: "Snowdon",
    desc: "Escalator broken",
    time: "15m ago",
    color: "#F97316",
    icon: "warning",
  },
  {
    id: 3,
    station: "McGill",
    desc: "Service Delay",
    time: "5m ago",
    color: "#EF4444",
    icon: "schedule",
  },
];

// --- SUB-COMPONENTS ---
function MapController({ centerPos }) {
  const map = useMap();
  useEffect(() => {
    map.setView(centerPos, 13);
  }, [centerPos, map]);
  return null;
}

function ReportModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="report-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-handle"></div>
        <h3>Report an Issue</h3>
        <p className="modal-subtitle">Help others avoid delays and controls.</p>

        <div className="report-btn-grid">
          <button
            className="report-option"
            onClick={() => {
              alert("Reported!");
              onClose();
            }}
          >
            <div className="icon-circle bg-red">
              <span className="material-icons">schedule</span>
            </div>
            <div>
              <h4>Service Delay</h4>
              <p>Train is stopped</p>
            </div>
          </button>
          <button
            className="report-option"
            onClick={() => {
              alert("Reported!");
              onClose();
            }}
          >
            <div className="icon-circle bg-orange">
              <span className="material-icons">warning</span>
            </div>
            <div>
              <h4>Hazard</h4>
              <p>Elevator/Escalator issue</p>
            </div>
          </button>
          <button
            className="report-option"
            onClick={() => {
              alert("Reported!");
              onClose();
            }}
          >
            <div className="icon-circle bg-blue">
              <span className="material-icons">local_police</span>
            </div>
            <div>
              <h4>Control Agents</h4>
              <p>Ticket inspectors visible</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function SignalementsList({ onClose }) {
  return (
    <div className="signalements-overlay">
      <div className="sig-header">
        <button className="back-btn" onClick={onClose}>
          <span className="material-icons">arrow_back</span>
        </button>
        <h2>Signalements</h2>
      </div>
      <div className="sig-list">
        {reportsData.map((r) => (
          <div key={r.id} className="sig-card">
            <div
              className="icon-circle"
              style={{ background: `${r.color}20`, color: r.color }}
            >
              <span className="material-icons">{r.icon}</span>
            </div>
            <div className="sig-content">
              <h4>{r.station}</h4>
              <p>{r.desc}</p>
              <span
                className="sig-tag"
                style={{ color: r.color, background: `${r.color}20` }}
              >
                {r.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- MAIN COMPONENT ---
export default function Home() {
  const [view, setView] = useState("menu"); // 'menu', 'signalements'
  const [showReport, setShowReport] = useState(false);
  const mtlCenter = [45.515, -73.58];

  return (
    <div className="home-container">
      {/* MAP LAYER */}
      <div className="map-wrapper">
        <MapContainer
          center={mtlCenter}
          zoom={13}
          zoomControl={false}
          style={{ height: "100%", width: "100%" }}
        >
          <MapController centerPos={mtlCenter} />
          <TileLayer
            attribution="&copy; CARTO"
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {stmLines.map((line, idx) => (
            <Polyline
              key={idx}
              positions={line.positions}
              pathOptions={{ color: line.color, weight: 4, opacity: 0.7 }}
            />
          ))}
          <Marker
            position={mtlCenter}
            icon={createIcon("#3B82F6", "my_location")}
          />
          <Marker
            position={[45.515, -73.561]}
            icon={createIcon("#3B82F6", "local_police")}
          />
        </MapContainer>
      </div>

      {/* UI LAYERS */}
      {view === "menu" && (
        <div className="ui-overlay">
          {/* Header */}
          <div className="header-area slide-up">
            <div className="location-bar">
              <div className="search-text">
                <span className="search-label">Options near</span>
                <span className="search-value">Montreal, QC</span>
              </div>
              <div className="nav-icon">
                <span className="material-icons">near_me</span>
              </div>
            </div>
            <div
              className="btn-signalements"
              onClick={() => setView("signalements")}
            >
              <div style={{ position: "relative" }}>
                <span className="material-icons">notifications</span>
                <div className="notification-badge"></div>
              </div>
            </div>
          </div>

          {/* Report FAB */}
          <button
            className="fab-report slide-up"
            onClick={() => setShowReport(true)}
          >
            <span className="material-icons">report_problem</span>
          </button>

          {/* Bottom List */}
          <div className="nearby-lines-container slide-up">
            {nearbyLines.map((line, idx) => (
              <div key={idx} className="line-row">
                <div className="line-info">
                  <div className={`line-number ${line.colorClass}`}>
                    {line.number}
                  </div>
                  <div className="line-details">
                    <span className={`line-direction ${line.colorClass}`}>
                      {line.dir}
                    </span>
                    <span className="line-stop">{line.stop}</span>
                  </div>
                </div>
                <div className="line-eta">
                  <span
                    className="material-icons"
                    style={{ color: "#3B82F6", fontSize: "1rem" }}
                  >
                    rss_feed
                  </span>
                  <span className="eta-number">{line.eta}</span>
                  <span className="eta-unit">min</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* OVERLAYS */}
      {showReport && <ReportModal onClose={() => setShowReport(false)} />}
      {view === "signalements" && (
        <SignalementsList onClose={() => setView("menu")} />
      )}
    </div>
  );
}
