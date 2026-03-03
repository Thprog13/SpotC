import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { metroLines } from "./metroData";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Ajout de Firestore
import { db } from "./firebase"; // Import de la base de données
import "./Signalement.css";

const Signalement = () => {
  const [type, setType] = useState("");
  const [station, setStation] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const allStations = [
    ...new Set(metroLines.flatMap((line) => line.stations)),
  ].sort();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!type || !station) {
      alert("Veuillez sélectionner une station et un type d'incident.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Envoi des données vers Firestore
      await addDoc(collection(db, "signalements"), {
        station: station,
        type: type,
        description: description,
        createdAt: serverTimestamp(), // Timestamp sécurisé du serveur
      });

      console.log("Signalement sauvegardé dans Firebase pour :", station);
      alert(
        `Signalement diffusé à ${station}. Il expirera automatiquement dans 30 min.`,
      );
      navigate("/metro"); // Redirection vers l'onglet Métro
    } catch (error) {
      console.error("Erreur lors de l'ajout du signalement: ", error);
      alert("Erreur lors de l'envoi du signalement. Vérifiez votre connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sig-modal-overlay">
      <div className="sig-card-compact slide-up">
        <div className="sig-header">
          <h3>Nouveau Signalement</h3>
          <button className="close-x-btn" onClick={() => navigate("/home")}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="sig-form">
          <div className="input-group-sig">
            <label>STATION CONCERNÉE</label>
            <select
              value={station}
              onChange={(e) => setStation(e.target.value)}
              className="sig-select"
            >
              <option value="">Sélectionner une station...</option>
              {allStations.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group-sig">
            <label>TYPE D'INCIDENT</label>
            <div className="type-grid-modern">
              <button
                type="button"
                className={`type-item-modern ${type === "Police" ? "active-police" : ""}`}
                onClick={() => setType("Police")}
              >
                <span className="material-icons">shield</span>
                <p>Contrôle</p>
              </button>

              <button
                type="button"
                className={`type-item-modern ${type === "Retard" ? "active-delay" : ""}`}
                onClick={() => setType("Retard")}
              >
                <span className="material-icons">history</span>
                <p>Retard</p>
              </button>

              <button
                type="button"
                className={`type-item-modern ${type === "Panne" ? "active-issue" : ""}`}
                onClick={() => setType("Panne")}
              >
                <span className="material-icons">warning</span>
                <p>Panne</p>
              </button>
            </div>
          </div>

          <div className="input-group-sig">
            <label>PRÉCISIONS (OPTIONNEL)</label>
            <textarea
              className="sig-textarea-modern"
              placeholder="Ex: Sortie Berri, agents visibles..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength="100"
            />
          </div>

          <button
            type="submit"
            className="submit-sig-btn-modern"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Envoi en cours..."
              : "Diffuser le signalement (30 min)"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signalement;
