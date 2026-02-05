import React from 'react';
import './App.css';
import metroMap from './assets/metro.png';

function Home() {
  return (
    <div className="home-container">
      <header className="app-header">
        <span className="material-icons">menu</span>
        <h1>Spot ton contrôleur</h1>
        <button className="btn-signalements">Signalements</button>
      </header>

      <div className="metro-map-wrapper">
        {/* Conteneur de l'image de la carte du métro */}
        <div className="map-container-relative">
          <img src={metroMap} alt="Plan du métro de Montréal" className="metro-image" />
          
          <div className="marker-alert" style={{ top: '60%', left: '62%' }}>
            <span className="material-icons">warning</span>
          </div>
        </div>

        <button className="fab-report" onClick={() => alert('Signalement à une station...')}>
          <span className="material-icons">add</span>
        </button>
      </div>

      <footer className="app-footer">
        <div className="nav-item active"><span className="material-icons">map</span><p>Carte</p></div>
        <div className="nav-item"><span className="material-icons">schedule</span><p>Horaires</p></div>
        <div className="nav-item"><span className="material-icons">shopping</span><p>Titres</p></div>
      </footer>
    </div>
  );
}

export default Home;