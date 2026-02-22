import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Tentative de connexion SQL pour:", email);
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card-modern">
        <div className="brand-header">
          <div className="logo-circle-gradient">
            <span className="material-icons">directions_subway</span>
          </div>
          <h2 className="brand-name">SpotC</h2>
          <p className="brand-tagline">Naviguez Montréal en toute sérénité</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-field-modern">
            <label>Adresse courriel</label>
            <div className="input-with-icon">
              <span className="material-icons">alternate_email</span>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Exemple@email.com" 
                required 
              />
            </div>
          </div>

          <div className="input-field-modern">
            <label>Mot de passe</label>
            <div className="input-with-icon">
              <span className="material-icons">lock_outline</span>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                required 
              />
            </div>
          </div>

          <button type="submit" className="login-btn-primary">
            Se connecter
            <span className="material-icons">arrow_forward</span>
          </button>
        </form>

        <div className="login-footer">
          <p>Pas encore de compte ? <a href="/signup">Créer un compte</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;