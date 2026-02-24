import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signInAnonymously 
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Connexion par Email
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (err) {
      setError("Erreur de connexion : " + err.message);
    }
  };

  // Connexion avec Google
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/home');
    } catch (err) {
      setError("Erreur Google : " + err.message);
    }
  };

  // Connexion Anonyme
  const handleAnonymousLogin = async () => {
    try {
      await signInAnonymously(auth);
      navigate('/home');
    } catch (err) {
      setError("Erreur Invité : " + err.message);
    }
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

        {error && <p style={{ color: '#ef4444', fontSize: '12px', marginBottom: '10px' }}>{error}</p>}

        <form onSubmit={handleEmailLogin} className="login-form">
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

        <div className="social-login" style={{ marginTop: '20px' }}>
          <button 
            onClick={handleGoogleLogin} 
            className="login-btn-secondary" 
            style={{ width: '100%', marginBottom: '10px', padding: '12px', borderRadius: '12px', border: '1px solid #333', background: '#222', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}
          >
             Continuer avec Google
          </button>
          
          <button 
            onClick={handleAnonymousLogin} 
            style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '13px', textDecoration: 'underline' }}
          >
            Continuer en tant qu'invité
          </button>
        </div>

        <div className="login-footer">
          <p>Pas encore de compte ? <a href="/signup">Créer un compte</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;