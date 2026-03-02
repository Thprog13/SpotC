const { onCall } = require("firebase-functions/v2/https");
const GtfsRealtimeBindings = require("gtfs-realtime-bindings");

// 1. Define the key here. Since this runs on the backend server,
// regular users cannot see this file.
const STM_API_KEY = "l70381f17ced4840968ee5c1ef1f076046";

// FUNCTION 1: Delays & Cancellations
exports.getTransitUpdates = onCall({ cors: true }, async (request) => {
  try {
    const response = await fetch(
      "https://api.stm.info/pub/od/gtfs-rt/ic/v2/tripUpdates",
      {
        method: "GET",
        headers: {
          apikey: STM_API_KEY,
          Accept: "application/x-protobuf",
          "Cache-Control": "no-cache",
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("STM REJECTED REQUEST (Updates). Details:", errorText);
      throw new Error(`STM API Error: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(buffer),
    );

    return { data: feed.entity };
  } catch (error) {
    console.error("Error fetching trip updates:", error);
    throw new Error("Failed to fetch trip updates.");
  }
});

// FUNCTION 2: EXACT GPS POSITIONS
exports.getVehiclePositions = onCall({ cors: true }, async (request) => {
  try {
    const response = await fetch(
      "https://api.stm.info/pub/od/gtfs-rt/ic/v2/vehiclePositions",
      {
        method: "GET",
        headers: {
          apikey: STM_API_KEY,
          Accept: "application/x-protobuf",
          "Cache-Control": "no-cache",
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("STM REJECTED REQUEST (Positions). Details:", errorText);
      throw new Error(`STM API Error: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(buffer),
    );

    const activeBuses = feed.entity
      .filter((entity) => entity.vehicle && entity.vehicle.position)
      .map((entity) => ({
        vehicleId: entity.vehicle.vehicle?.id || "Unknown",
        routeId: entity.vehicle.trip?.routeId || "Unknown",
        latitude: entity.vehicle.position.latitude,
        longitude: entity.vehicle.position.longitude,
        lastUpdated: new Date(
          entity.vehicle.timestamp * 1000,
        ).toLocaleTimeString("fr-CA"),
      }));

    return { data: activeBuses };
  } catch (error) {
    console.error("Error fetching vehicle positions:", error);
    throw new Error("Failed to fetch vehicle GPS positions.");
  }
});
