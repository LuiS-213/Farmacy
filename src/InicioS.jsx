import React, { useState } from 'react';
import './inicioS.css';

const InicioS = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Preparamos los datos para el Back-end
    const datosLogin = {
      correo: email,
      password: password
    };

    // 2. Hacemos la petición a tu API
    fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosLogin)
    })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        // Esto captura el "Usuario no encontrado" o "Contraseña incorrecta" del controller
        throw new Error(data.message || 'Error en el servidor');
      }
      return data;
    })
    .then((respuesta) => {
      // 3. Si el login es correcto, guardamos el Token
      console.log("Token de sesión:", respuesta.token);
      localStorage.setItem('token', respuesta.token);
      
      // 4. Llamamos a la función onLogin que viene por props para cambiar de vista
      onLogin(); 
    })
    .catch((err) => {
      // 5. Si hay error, avisamos al usuario
      alert(err.message);
      console.error("Detalle del error:", err);
    });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Bienvenido</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password}
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