import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Firestore functions
import { db, auth } from "./firebase";
import "./Signalement.css";

const Signalement = ({ onSignalementSuccess, onClose }) => {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!type) {
      alert("Veuillez sélectionner un type de signalement.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to Firestore collection named "reports"
      const docRef = await addDoc(collection(db, "reports"), {
        type: type,
        description: description,
        userId: auth.currentUser ? auth.currentUser.uid : "Anonyme", // Track user
        createdAt: serverTimestamp(), // Database time
        expiresAt: Date.now() + 30 * 60 * 1000,
      });

      console.log("Signalement enregistré avec ID: ", docRef.id);
      
      onSignalementSuccess({ id: docRef.id, type, description });
      onClose();
    } catch (error) {
      console.error("Erreur d'ajout:", error);
      alert("Erreur lors de l'envoi du signalement.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sig-modal-overlay">
      {/* ... keep existing form structure ... */}
      <div className="sig-card-compact slide-up">
        <form onSubmit={handleSubmit}>
          {/* ... type buttons and description textarea ... */}
          <button type="submit" className="submit-sig-btn" disabled={isSubmitting}>
            {isSubmitting ? "Envoi..." : "Signaler pour 30 min"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signalement;