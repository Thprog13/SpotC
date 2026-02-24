import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signInAnonymously 
} from 'firebase/auth';
import { auth, googleProvider } from './firebase'; // Vérifiez que le chemin est correct
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError(''); // Réinitialise l'erreur avant la tentative
    try {
      // Firebase attend un string valide pour l'email
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (err) {
      setError("Erreur : " + err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/home');
    } catch (err) {
      setError("Erreur Google : " + err.message);
    }
  };

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

        {error && <p className="error-message">{error}</p>}

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

        <div className="social-separator">ou</div>

        <div className="social-login-group">
          <button onClick={handleGoogleLogin} className="login-btn-secondary google-btn">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
            Continuer avec Google
          </button>
          
          <button onClick={handleAnonymousLogin} className="login-btn-secondary guest-btn">
            <span className="material-icons">person_outline</span>
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