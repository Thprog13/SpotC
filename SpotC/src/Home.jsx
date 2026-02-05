import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "./App.css";

// Fix Leaflet's default icon issue
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- CUSTOM ICONS ---
const createCustomIcon = (color, iconName, pulse = false) => {
  return L.divIcon({
    className: "custom-map-marker",
    html: `<div class="marker-pin ${pulse ? "pulse" : ""}" style="background-color: ${color};">
      <span class="material-icons">${iconName}</span>
    </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
};

const policeIcon = createCustomIcon("#4285F4", "local_police", true);
const hazardIcon = createCustomIcon("#F59E0B", "warning");
const delayIcon = createCustomIcon("#EF4444", "schedule");
const userIcon = createCustomIcon("#3B82F6", "navigation");

// --- STM METRO LINES DATA (Coordinates & Colors) ---
const stmLines = [
  {
    name: "Green Line",
    color: "#009739", // Official STM Green
    positions: [
      [45.4461, -73.6036], // Angrignon
      [45.4578, -73.5821], // De l'Église
      [45.48, -73.5796], // Lionel-Groulx
      [45.4897, -73.5821], // Atwater
      [45.495, -73.5788], // Guy-Concordia
      [45.5032, -73.5695], // McGill
      [45.5078, -73.5627], // Place-des-Arts
      [45.5152, -73.5611], // Berri-UQAM
      [45.525, -73.5532], // Papineau
      [45.5416, -73.5434], // Joliette
      [45.5583, -73.5356], // Pie-IX
      [45.5891, -73.5117], // Honoré-Beaugrand
    ],
  },
  {
    name: "Orange Line",
    color: "#E87722", // Official STM Orange
    positions: [
      [45.5143, -73.6826], // Côte-Vertu
      [45.4947, -73.6559], // Namur
      [45.4856, -73.6284], // Snowdon
      [45.4779, -73.6074], // Villa-Maria
      [45.4727, -73.588], // Place-Saint-Henri
      [45.48, -73.5796], // Lionel-Groulx
      [45.4925, -73.5606], // Lucien-L'Allier
      [45.4983, -73.5574], // Bonaventure
      [45.5034, -73.56], // Square-Victoria-OACI
      [45.5152, -73.5611], // Berri-UQAM
      [45.5242, -73.5815], // Mont-Royal
      [45.5317, -73.5996], // Laurier
      [45.5359, -73.6186], // Rosemont
      [45.5478, -73.6291], // Jean-Talon
      [45.5604, -73.6565], // Crémazie
      [45.5562, -73.7214], // Montmorency
    ],
  },
  {
    name: "Yellow Line",
    color: "#FFCD00", // Official STM Yellow
    positions: [
      [45.5152, -73.5611], // Berri-UQAM
      [45.509, -73.5332], // Jean-Drapeau
      [45.524, -73.5218], // Longueuil
    ],
  },
  {
    name: "Blue Line",
    color: "#005EB8", // Official STM Blue
    positions: [
      [45.4856, -73.6284], // Snowdon
      [45.5024, -73.6234], // Université-de-Montréal
      [45.5145, -73.6125], // Outremont
      [45.528, -73.612], // Acadie
      [45.5478, -73.6291], // Jean-Talon
      [45.5539, -73.6133], // Fabre
      [45.5583, -73.5985], // Saint-Michel
    ],
  },
];

// --- SUB-COMPONENTS ---

// 1. Map Controller for Buttons
function MapController({
  zoomInTrigger,
  zoomOutTrigger,
  centerTrigger,
  centerPos,
}) {
  const map = useMap();
  useEffect(() => {
    if (zoomInTrigger) map.zoomIn();
  }, [zoomInTrigger, map]);
  useEffect(() => {
    if (zoomOutTrigger) map.zoomOut();
  }, [zoomOutTrigger, map]);
  useEffect(() => {
    if (centerTrigger) map.setView(centerPos, 13);
  }, [centerTrigger, map, centerPos]);
  return null;
}

// 2. Report Modal
function ReportModal({ onClose }) {
  const handleReport = (type) => {
    alert(`Signalement envoyé: ${type}`);
    onClose(); // Close modal after reporting
  };

  return (
    <div className="modal-overlay">
      <div className="report-modal animate-slide-up">
        <div className="modal-handle"></div>
        <h3>Report an Issue</h3>
        <p className="modal-subtitle">
          Help other commuters by reporting transit issues
        </p>

        <button
          className="report-option-btn"
          onClick={() => handleReport("Retard")}
        >
          <div className="icon-circle red">
            <span className="material-icons">schedule</span>
          </div>
          <div className="option-text">
            <h4>Service Delay</h4>
            <p>Train/Bus running late</p>
          </div>
        </button>

        <button
          className="report-option-btn"
          onClick={() => handleReport("Danger")}
        >
          <div className="icon-circle orange">
            <span className="material-icons">warning</span>
          </div>
          <div className="option-text">
            <h4>Station Hazard</h4>
            <p>Elevator/escalator issue</p>
          </div>
        </button>

        <button
          className="report-option-btn"
          onClick={() => handleReport("Contrôleurs")}
        >
          <div className="icon-circle blue">
            <span className="material-icons">local_police</span>
          </div>
          <div className="option-text">
            <h4>Control Agents</h4>
            <p>Ticket inspectors at station</p>
          </div>
        </button>

        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

// 3. Signalements List
function SignalementsList({ onClose }) {
  const reports = [
    {
      id: 1,
      type: "Contrôle",
      line: "Ligne Verte",
      station: "Station Berri-UQAM",
      desc: "Agents de contrôle à la sortie principale",
      time: "5 min",
      user: "Marie L.",
      color: "#4285F4",
      icon: "local_police",
    },
    {
      id: 2,
      type: "Contrôle",
      line: "Ligne Orange",
      station: "Station Côte-Vertu",
      desc: "2 contrôleurs près des tourniquets",
      time: "12 min",
      user: "Alex M.",
      color: "#4285F4",
      icon: "local_police",
    },
    {
      id: 3,
      type: "Retard",
      line: "Ligne Bleue",
      station: "Station Snowdon",
      desc: "Retard de 10 minutes annoncé",
      time: "18 min",
      user: "Sophie D.",
      color: "#EF4444",
      icon: "schedule",
    },
  ];

  return (
    <div className="signalements-container animate-fade-in">
      <div className="signalements-header">
        <button onClick={onClose}>
          <span className="material-icons">arrow_back</span>
        </button>
        <h2>Signalements</h2>
        <span className="material-icons">filter_list</span>
      </div>
      <div className="filter-chips">
        <span className="chip active">Toutes les lignes</span>
        <span className="chip green">Ligne Verte</span>
        <span className="chip orange">Ligne Orange</span>
      </div>
      <div className="reports-scroll">
        {reports.map((r) => (
          <div key={r.id} className="report-card">
            <div
              className="report-icon"
              style={{ background: r.color + "20", color: r.color }}
            >
              <span className="material-icons">{r.icon}</span>
            </div>
            <div className="report-content">
              <div className="report-tags">
                <span
                  className="tag"
                  style={{ color: r.color, background: r.color + "15" }}
                >
                  {r.type}
                </span>
                <span
                  className={`tag line-tag ${r.line.includes("Verte") ? "green" : r.line.includes("Orange") ? "orange" : "blue"}`}
                >
                  {r.line}
                </span>
                <span className="time">{r.time}</span>
              </div>
              <h4>{r.station}</h4>
              <p>{r.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- MAIN COMPONENT ---
function Home() {
  const [view, setView] = useState("map"); // 'map', 'report', 'signalements'
  const [sheetVisible, setSheetVisible] = useState(true);

  // Map Control Triggers
  const [zoomInTick, setZoomInTick] = useState(0);
  const [zoomOutTick, setZoomOutTick] = useState(0);
  const [centerTick, setCenterTick] = useState(0);

  const mtlPosition = [45.5017, -73.5673];
  const berriUqam = [45.5152, -73.5611];

  return (
    <div className="home-container">
      {/* 1. MAP & CONTROLS */}
      {view === "map" && (
        <>
          <header className="app-header animate-slide-down">
            <button className="icon-btn">
              <span className="material-icons">menu</span>
            </button>
            <h1>TransitWatch MTL</h1>
            <button
              className="btn-signalements"
              onClick={() => setView("signalements")}
            >
              <span className="material-icons">list</span>
              Signalements
            </button>
          </header>

          <div className="nav-instruction-card animate-slide-down">
            <div className="nav-icon-box">
              <span className="material-icons">arrow_upward</span>
            </div>
            <div className="nav-text">
              <h3>Marchez vers la station Mont-Royal</h3>
              <p>Ensuite prendre la Ligne Orange</p>
            </div>
            <div className="nav-arrow">
              <span className="material-icons">near_me</span>
            </div>
          </div>

          <div className="map-wrapper">
            <MapContainer
              center={mtlPosition}
              zoom={13}
              zoomControl={false}
              style={{ height: "100%", width: "100%" }}
            >
              <MapController
                zoomInTrigger={zoomInTick}
                zoomOutTrigger={zoomOutTick}
                centerTrigger={centerTick}
                centerPos={mtlPosition}
              />

              {/* CartoDB Tiles */}
              <TileLayer
                attribution="&copy; CARTO"
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />

              {/* DRAW STM LINES */}
              {stmLines.map((line, idx) => (
                <Polyline
                  key={idx}
                  positions={line.positions}
                  pathOptions={{ color: line.color, weight: 6, opacity: 0.8 }}
                />
              ))}

              {/* Markers */}
              <Marker position={berriUqam} icon={policeIcon}>
                <Popup>Contrôleurs à Berri-UQAM</Popup>
              </Marker>
              <Marker position={[45.495, -73.578]} icon={hazardIcon} />
              <Marker position={[45.508, -73.555]} icon={delayIcon} />
              <Marker position={mtlPosition} icon={userIcon} />
            </MapContainer>
          </div>

          <div className="fab-controls">
            <button
              className="fab-btn"
              onClick={() => setZoomInTick((t) => t + 1)}
            >
              <span className="material-icons">add</span>
            </button>
            <button
              className="fab-btn"
              onClick={() => setZoomOutTick((t) => t + 1)}
            >
              <span className="material-icons">remove</span>
            </button>
            <button
              className="fab-btn"
              onClick={() => setCenterTick((t) => t + 1)}
            >
              <span className="material-icons">my_location</span>
            </button>
            <button
              className="fab-btn primary pulse-shadow"
              onClick={() => setView("report")}
            >
              <span className="material-icons">report_problem</span>
            </button>
          </div>

          {/* BOTTOM SHEET */}
          {sheetVisible && (
            <div className="bottom-sheet animate-slide-up-slow">
              <div className="sheet-handle"></div>
              <div className="sheet-header">
                <div>
                  <h2>Station Berri-UQAM</h2>
                  <div className="arrival-time">
                    <span className="material-icons">schedule</span> Arrive by
                    14:45
                  </div>
                </div>
                {/* Close Button now works */}
                <span
                  className="material-icons close-icon"
                  onClick={() => setSheetVisible(false)}
                >
                  close
                </span>
              </div>

              <div className="route-card active">
                <div className="route-header">
                  <span className="material-icons blue-text">alt_route</span>
                  <span>Ligne Verte → Ligne Orange</span>
                  <span className="badge green">Fastest</span>
                </div>
                <div className="route-details">
                  <span>18 min</span>
                  <span>• 2.8 km</span>
                  <span>• 1 transfer</span>
                </div>
              </div>

              <button
                className="start-btn"
                onClick={() => alert("Navigation started!")}
              >
                Start Transit Navigation
              </button>
            </div>
          )}
        </>
      )}

      {/* 2. OVERLAYS */}
      {view === "report" && <ReportModal onClose={() => setView("map")} />}
      {view === "signalements" && (
        <SignalementsList onClose={() => setView("map")} />
      )}
    </div>
  );
}

export default Home;
