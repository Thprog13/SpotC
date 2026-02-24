import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signInAnonymously 
} from 'firebase/auth';
import { auth, googleProvider } from './firebase'; // Ensure this path is correct
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
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
        <h2 className="brand-name">SpotC</h2>
        {error && <p style={{ color: '#ef4444' }}>{error}</p>}
        
        <form onSubmit={handleEmailLogin}>
          {/* Email and Password inputs as before */}
          <button type="submit" className="login-btn-primary">Se connecter</button>
        </form>

        <div style={{ marginTop: '20px' }}>
          <button onClick={handleGoogleLogin} className="login-btn-secondary">
            Continuer avec Google
          </button>
          <button onClick={handleAnonymousLogin} style={{ display: 'block', margin: '10px auto' }}>
            Continuer en tant qu'invité
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;