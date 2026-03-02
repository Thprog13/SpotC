const { onCall } = require("firebase-functions/v2/https");
const GtfsRealtimeBindings = require("gtfs-realtime-bindings");

exports.getTransitUpdates = onCall({ cors: true }, async (request) => {
  try {
    // 1. Temporarily hardcode the key to bypass any .env loading issues
    const API_KEY = "l70381f17ced4840968ee5c1ef1f076046";

    const response = await fetch(
      "https://api.stm.info/pub/od/gtfs-rt/ic/v2/tripUpdates",
      {
        method: "GET",
        headers: {
          apikey: API_KEY,
          // Add this to tell STM we explicitly want binary protobuf data
          Accept: "application/x-protobuf",
          "Cache-Control": "no-cache",
        },
      },
    );

    if (!response.ok) {
      // 2. If it fails again, this will read the EXACT error message from STM
      const errorText = await response.text();
      console.error("STM REJECTED REQUEST. Details:", errorText);
      throw new Error(`STM API Error: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(buffer),
    );

    return { data: feed.entity };
  } catch (error) {
    console.error("Error fetching or decoding transit data:", error);
    throw new Error("Failed to fetch transit data from STM.");
  }
});
