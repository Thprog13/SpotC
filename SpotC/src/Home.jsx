import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "./firebase";
import L from "leaflet";
import { stmBusData } from "./busData"; // We need this to get the bus names!

// Custom Bus Icon for Map
const busIcon = new L.divIcon({
  html: '<div style="font-size: 28px; line-height: 1; filter: drop-shadow(0px 4px 4px rgba(0,0,0,0.5));">🚌</div>',
  className: "custom-bus-icon",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15],
});

// Default Leaflet Pin for User Location
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Helper component to pan map
const MapController = ({ userLat, userLng, selectedBus }) => {
  const map = useMap();
  useEffect(() => {
    if (selectedBus) {
      map.flyTo([selectedBus.latitude, selectedBus.longitude], 16, {
        duration: 1.2,
      });
    } else if (userLat && userLng) {
      map.flyTo([userLat, userLng], 14, { duration: 1.2 });
    }
  }, [userLat, userLng, selectedBus, map]);
  return null;
};

// Math formula for distance
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

// Helper: Get Bus Name and Color from your busData.js
const getRouteDetails = (routeId) => {
  let routeName = "Direction Inconnue";
  let color = "#3b82f6"; // Default Blue

  for (const [category, lines] of Object.entries(stmBusData)) {
    const bus = lines.find((b) => b.id === routeId);
    if (bus) {
      routeName = bus.name;
      if (category.includes("Express")) color = "#ef4444"; // Red
      if (category.includes("Nuit")) color = "#52525b"; // Gray
      if (category.includes("REM")) color = "#10b981"; // Green
      break;
    }
  }
  return { routeName, color };
};

const Home = () => {
  const [userLoc, setUserLoc] = useState(null);
  const [nearbyBuses, setNearbyBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLoc({ lat: latitude, lng: longitude });
        fetchNearbyBuses(latitude, longitude);
      },
      (error) => {
        console.error("Location error:", error);
        const defaultLat = 45.5017,
          defaultLng = -73.5673; // Downtown MTL
        setUserLoc({ lat: defaultLat, lng: defaultLng });
        fetchNearbyBuses(defaultLat, defaultLng);
      },
    );
  }, []);

  const fetchNearbyBuses = async (userLat, userLng) => {
    try {
      setLoading(true);
      const functions = getFunctions(app);
      const getVehiclePositions = httpsCallable(
        functions,
        "getVehiclePositions",
      );
      const result = await getVehiclePositions();

      const busesNearMe = result.data.data
        .map((bus) => {
          const distance = calculateDistance(
            userLat,
            userLng,
            bus.latitude,
            bus.longitude,
          );
          const etaMinutes = Math.round((distance / 15) * 60);
          const { routeName, color } = getRouteDetails(bus.routeId);
          return { ...bus, distance, etaMinutes, routeName, color };
        })
        .filter((bus) => bus.distance <= 4) // 2.5km radius
        .sort((a, b) => a.distance - b.distance);

      setNearbyBuses(busesNearMe);
    } catch (error) {
      console.error("Error fetching map data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter buses based on search bar
  const filteredBuses = nearbyBuses.filter(
    (bus) =>
      bus.routeId.includes(searchQuery) ||
      bus.routeName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      backgroundColor: "#000",
      color: "#fff",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    topSection: { padding: "15px 20px 10px 20px", zIndex: 10 },
    searchBarWrapper: { position: "relative", marginBottom: "15px" },
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
    mapWrapper: { height: "35vh", width: "100%", flexShrink: 0 },
    listContainer: {
      flex: 1,
      overflowY: "auto",
      padding: "10px 0",
      backgroundColor: "#121212",
      borderTopLeftRadius: "25px",
      borderTopRightRadius: "25px",
      marginTop: "-15px",
      zIndex: 20,
      position: "relative",
      boxShadow: "0 -4px 15px rgba(0,0,0,0.5)",
    },
    dragHandle: {
      width: "40px",
      height: "5px",
      backgroundColor: "#333",
      borderRadius: "3px",
      margin: "0 auto 15px auto",
    },
    listHeader: {
      padding: "0 20px",
      color: "#888",
      fontSize: "14px",
      fontWeight: "600",
      marginBottom: "10px",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },

    // Transit App Row Style
    busRow: (isSelected) => ({
      display: "flex",
      alignItems: "center",
      padding: "16px 20px",
      backgroundColor: isSelected ? "#2a2a2a" : "transparent",
      borderBottom: "1px solid #222",
      cursor: "pointer",
      transition: "background-color 0.2s",
    }),
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
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "200px",
    },
    busDistance: {
      fontSize: "13px",
      color: "#888",
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },
    etaWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
    },
    etaTime: {
      fontSize: "26px",
      fontWeight: "800",
      color: "#4ade80",
      lineHeight: "1",
    },
    etaLabel: { fontSize: "12px", color: "#4ade80", fontWeight: "600" },
    liveIcon: {
      fontSize: "12px",
      color: "#4ade80",
      animation: "pulse 1.5s infinite",
    },
  };

  return (
    <div style={styles.container}>
      {/* Search Header */}
      <div style={styles.topSection}>
        <div style={styles.searchBarWrapper}>
          <span className="material-icons" style={styles.searchIcon}>
            search
          </span>
          <input
            type="text"
            placeholder="Où allez-vous ? (ex: 45, Papineau)"
            style={styles.searchBar}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Map Section (Top Half) */}
      <div style={styles.mapWrapper}>
        {userLoc && (
          <MapContainer
            center={[userLoc.lat, userLoc.lng]}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
            theme="dark"
            zoomControl={false} // Cleaner look like Transit app
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />
            <MapController
              userLat={userLoc.lat}
              userLng={userLoc.lng}
              selectedBus={selectedBus}
            />
            <Marker position={[userLoc.lat, userLoc.lng]}>
              <Popup>Vous êtes ici</Popup>
            </Marker>

            {selectedBus && (
              <Marker
                position={[selectedBus.latitude, selectedBus.longitude]}
                icon={busIcon}
              >
                <Popup>
                  <strong>
                    {selectedBus.routeName} ({selectedBus.routeId})
                  </strong>
                  <br />
                  Bus #{selectedBus.vehicleId}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        )}
      </div>

      {/* Transit-style List (Bottom Half) */}
      <div style={styles.listContainer}>
        <div style={styles.dragHandle}></div>
        <div style={styles.listHeader}>
          {loading
            ? "Recherche de signaux GPS..."
            : `À PROXIMITÉ (${filteredBuses.length})`}
        </div>

        {filteredBuses.map((bus, idx) => {
          const isSelected = selectedBus?.vehicleId === bus.vehicleId;

          return (
            <div
              key={idx}
              style={styles.busRow(isSelected)}
              onClick={() => setSelectedBus(isSelected ? null : bus)}
            >
              {/* Colored Route Square */}
              <div style={styles.busBadge(bus.color)}>{bus.routeId}</div>

              {/* Route Name & Distance */}
              <div style={styles.busInfo}>
                <div style={styles.busName}>{bus.routeName}</div>
                <div style={styles.busDistance}>
                  <span className="material-icons" style={{ fontSize: "14px" }}>
                    place
                  </span>
                  {bus.distance.toFixed(1)} km d'ici
                </div>
              </div>

              {/* Large ETA Info */}
              <div style={styles.etaWrapper}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "2px",
                  }}
                >
                  <span style={styles.etaTime}>{bus.etaMinutes}</span>
                  <span style={styles.etaLabel}>min</span>
                </div>
                <div style={styles.busDistance}>
                  <span className="material-icons" style={styles.liveIcon}>
                    sensors
                  </span>
                  En direct
                </div>
              </div>
            </div>
          );
        })}

        {!loading && filteredBuses.length === 0 && (
          <div style={{ padding: "30px", textAlign: "center", color: "#666" }}>
            <span
              className="material-icons"
              style={{ fontSize: "40px", marginBottom: "10px" }}
            >
              location_off
            </span>
            <p>Aucun bus trouvé pour cette recherche.</p>
          </div>
        )}
      </div>

      {/* Add a simple pulse animation for the live sensor icon */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.3; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
