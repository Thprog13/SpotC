import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import './Login.css';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

// Inside your handleSubmit function
const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      alert("Compte créé avec succès !");
      navigate('/login');
    } catch (err) {
      alert("Erreur : " + err.message);
    }
}

  return (
    <div className="login-page-wrapper">
      <div className="login-card-modern">
        <div className="brand-header">
          <div className="logo-circle-gradient">
            <span className="material-icons">person_add</span>
          </div>
          <h2 className="brand-name">Rejoindre SpotC</h2>
          <p className="brand-tagline">Créez votre profil pour signaler en temps réel</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-field-modern">
            <label>Nom d'utilisateur</label>
            <div className="input-with-icon">
              <span className="material-icons">badge</span>
              <input 
                name="username"
                type="text" 
                value={formData.username}
                onChange={handleChange}
                placeholder="SpotCUser123" 
                required 
              />
            </div>
          </div>

          <div className="input-field-modern">
            <label>Adresse courriel</label>
            <div className="input-with-icon">
              <span className="material-icons">alternate_email</span>
              <input 
                name="email"
                type="email" 
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                type="password" 
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••" 
                required 
              />
            </div>
          </div>

          <div className="input-field-modern">
            <label>Confirmer le mot de passe</label>
            <div className="input-with-icon">
              <span className="material-icons">verified_user</span>
              <input 
                name="confirmPassword"
                type="password" 
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••" 
                required 
              />
            </div>
          </div>

          <button type="submit" className="login-btn-primary" style={{ background: 'linear-gradient(135deg, #10b981, #3b82f6)' }}>
            Créer mon compte
            <span className="material-icons">how_to_reg</span>
          </button>
        </form>

        <div className="login-footer">
          <p>Déjà inscrit ? <a href="/login">Se connecter</a></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;