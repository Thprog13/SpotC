import React, { useState, useEffect } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "./firebase"; // Make sure this path points to your initialized firebase.js

const RealtimeTracker = () => {
  const [tripUpdates, setTripUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveBusData = async () => {
      try {
        const functions = getFunctions(app);
        const getTransitUpdates = httpsCallable(functions, "getTransitUpdates");

        // This calls your newly deployed backend function!
        const result = await getTransitUpdates();

        console.log("Clean JSON from backend:", result.data.data);
        setTripUpdates(result.data.data);
      } catch (error) {
        console.error("Error calling backend function:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveBusData();
  }, []);

  if (loading) return <p>Loading live transit data...</p>;

  return (
    <div>
      <h2>Live STM Updates</h2>
      <ul>
        {tripUpdates.slice(0, 5).map((entity) => (
          <li key={entity.id}>
            <strong>Route ID:</strong> {entity.tripUpdate?.trip?.routeId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RealtimeTracker;
