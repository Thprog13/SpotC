import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "./firebase";
import L from "leaflet";

// Fix for default Leaflet icons in React (User's location)
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Bus Icon (Uses an emoji so you don't need to import images)
const busIcon = new L.divIcon({
  html: '<div style="font-size: 28px; line-height: 1; filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.5));">🚌</div>',
  className: "custom-bus-icon",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15],
});

// Helper component to smoothly pan the map when a bus is selected
const MapController = ({ userLat, userLng, selectedBus }) => {
  const map = useMap();
  useEffect(() => {
    if (selectedBus) {
      // Pan to the bus if one is clicked
      map.flyTo([selectedBus.latitude, selectedBus.longitude], 16, {
        duration: 1.5,
      });
    } else if (userLat && userLng) {
      // Default center is the user
      map.flyTo([userLat, userLng], 14, { duration: 1.5 });
    }
  }, [userLat, userLng, selectedBus, map]);
  return null;
};

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
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const Home = () => {
  const [userLoc, setUserLoc] = useState(null);
  const [nearbyBuses, setNearbyBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null); // NEW: Tracks clicked bus
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLoc({ lat: latitude, lng: longitude });
        fetchNearbyBuses(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        const defaultLat = 45.5017;
        const defaultLng = -73.5673;
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

      const allBuses = result.data.data;

      const busesNearMe = allBuses
        .map((bus) => {
          const distance = calculateDistance(
            userLat,
            userLng,
            bus.latitude,
            bus.longitude,
          );
          const etaMinutes = Math.round((distance / 15) * 60);
          return { ...bus, distance, etaMinutes };
        })
        .filter((bus) => bus.distance <= 2) // CHANGED: Now strictly 2km
        .sort((a, b) => a.distance - b.distance);

      setNearbyBuses(busesNearMe);
    } catch (error) {
      console.error("Error fetching map data:", error);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      padding: "20px",
      color: "white",
      backgroundColor: "#121212",
      minHeight: "100vh",
    },
    mapWrapper: {
      height: "50vh",
      width: "100%",
      borderRadius: "12px",
      overflow: "hidden",
      marginTop: "15px",
      border: "1px solid #333",
    },
    busList: {
      marginTop: "20px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "12px",
    },
    card: (isSelected) => ({
      backgroundColor: isSelected ? "#2a2a2a" : "#1e1e1e",
      padding: "15px",
      borderRadius: "8px",
      border: isSelected ? "2px solid #3b82f6" : "1px solid #333",
      cursor: "pointer",
      transition: "all 0.2s ease",
      transform: isSelected ? "scale(1.02)" : "scale(1)",
    }),
  };

  return (
    <div style={styles.container}>
      <h2>📍 Bus Près de Vous</h2>
      <p style={{ color: "#aaa" }}>
        {loading
          ? "Recherche des bus en cours..."
          : `${nearbyBuses.length} bus trouvés dans un rayon de 2km. Cliquez sur un bus pour le voir sur la carte.`}
      </p>

      {/* THE MAP */}
      <div style={styles.mapWrapper}>
        {userLoc && (
          <MapContainer
            center={[userLoc.lat, userLoc.lng]}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
            theme="dark"
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />

            {/* Smoothly pans map to the selected bus or user */}
            <MapController
              userLat={userLoc.lat}
              userLng={userLoc.lng}
              selectedBus={selectedBus}
            />

            {/* Standard Blue Pin for the User */}
            <Marker position={[userLoc.lat, userLoc.lng]}>
              <Popup>Vous êtes ici</Popup>
            </Marker>

            {/* Custom Bus Marker - ONLY displays if a bus is selected */}
            {selectedBus && (
              <Marker
                position={[selectedBus.latitude, selectedBus.longitude]}
                icon={busIcon}
              >
                <Popup>
                  <strong style={{ color: "black", fontSize: "16px" }}>
                    Ligne {selectedBus.routeId}
                  </strong>
                  <br />
                  Bus #{selectedBus.vehicleId}
                  <br />
                  Distance: {selectedBus.distance.toFixed(1)} km
                  <br />
                  Temps estimé: {selectedBus.etaMinutes} min
                  <br />
                </Popup>
              </Marker>
            )}
          </MapContainer>
        )}
      </div>

      {/* TEXT LIST OF CLOSEST BUSES */}
      <div style={styles.busList}>
        {nearbyBuses.slice(0, 8).map((bus, idx) => {
          const isSelected = selectedBus?.vehicleId === bus.vehicleId;

          return (
            <div
              key={idx}
              style={styles.card(isSelected)}
              onClick={() => setSelectedBus(isSelected ? null : bus)} // Toggle selection
            >
              <h3 style={{ margin: "0 0 5px 0" }}>Ligne {bus.routeId}</h3>
              <p style={{ margin: 0, color: "#4ade80", fontWeight: "bold" }}>
                {bus.etaMinutes} min ({bus.distance.toFixed(1)} km)
              </p>
              <p
                style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#888" }}
              >
                Dernière MAJ: {bus.lastUpdated}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
