import React, { useState } from 'react';

const InicioS = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación
    if (email === "user@test.com" && password === "123") {
      onLogin(); // onLogin() es lo que cambia la vista
    } else {
      alert("Credenciales incorrectas (user@test.com / 123)");
    }
  };
  return (
    <div>
      <h2>Bienvenido</h2>
      <form onSubmit={handleSubmit} >
        <input 
          type="email" 
          placeholder="Correo electrónico" 
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default InicioS;