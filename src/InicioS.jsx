import React, { useState } from 'react';
import './inicioS.css';

const InicioS = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "user@test.com" && password === "123") {
      onLogin();
    } else {
      alert("Credenciales incorrectas (user@test.com / 123)");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Bienvenido</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default InicioS;