import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

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
};