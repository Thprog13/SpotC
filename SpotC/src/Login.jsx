import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // C'est ici que tu feras l'appel à ton backend Node.js/Express
    console.log("Tentative de connexion SQL pour:", email);
    
    // Exemple de ce à quoi ressemblera l'appel API plus tard :
    /*
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    */
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="icon-circle">
          <span className="material-icons">train</span>
        </div>
        
        <h2>SpotC</h2>
        <p className="subtitle">Signaler et éviter les contrôles STM</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Adresse courriel</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com" 
              required 
            />
          </div>

          <div className="input-group">
            <label>Mot de passe</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              required 
            />
          </div>

          <button type="submit" className="login-button">
            Se connecter
          </button>
        </form>

        <p className="footer-text">
          Pas encore de compte ? <a href="#">Créer un compte</a>
        </p>
      </div>
    </div>
  );
}

export default App;