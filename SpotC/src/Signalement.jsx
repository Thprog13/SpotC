import React, { useState } from "react";
import "./Signalement.css";

const Signalement = ({ onSignalementSuccess, onClose }) => {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!type) {
      alert("Veuillez sélectionner un type de signalement.");
      return;
    }

    setIsSubmitting(true);

    // Simulation d'envoi à ta base de données SQL
    const nouveauSignalement = {
      id: Date.now(),
      type,
      description,
      timestamp: new Date().toLocaleTimeString(),
      expiresAt: Date.now() + 30 * 60 * 1000, // Expire dans 30 minutes
    };

    console.log("Signalement envoyé :", nouveauSignalement);

    // Logique d'auto-suppression après 30 minutes (1800000 ms)
    setTimeout(() => {
      console.log(`Le signalement ${nouveauSignalement.id} a été retiré de la carte.`);
    }, 1800000);

    setTimeout(() => {
      setIsSubmitting(false);
      onSignalementSuccess(nouveauSignalement);
      onClose();
    }, 800);
  };

  return (
    <div className="sig-modal-overlay">
      <div className="sig-card-compact slide-up">
        <div className="sig-header">
          <h3>Nouveau Signalement</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="sig-form">
          <div className="type-grid">
            <button 
              type="button" 
              className={`type-item ${type === 'Police' ? 'active-police' : ''}`}
              onClick={() => setType('Police')}
            >
              <span className="material-icons">local_police</span>
              <p>Contrôle</p>
            </button>
            <button 
              type="button" 
              className={`type-item ${type === 'Retard' ? 'active-delay' : ''}`}
              onClick={() => setType('Retard')}
            >
              <span className="material-icons">schedule</span>
              <p>Retard</p>
            </button>
            <button 
              type="button" 
              className={`type-item ${type === 'Panne' ? 'active-issue' : ''}`}
              onClick={() => setType('Panne')}
            >
              <span className="material-icons">report_problem</span>
              <p>Panne</p>
            </button>
          </div>

          <div className="input-group-sig">
            <label>Précisions (optionnel)</label>
            <textarea 
              placeholder="Ex: Sortie Berri, agents visibles..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength="100"
            />
          </div>

          <button type="submit" className="submit-sig-btn" disabled={isSubmitting}>
            {isSubmitting ? "Envoi..." : "Signaler pour 30 min"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signalement;