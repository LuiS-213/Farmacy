import { useState } from 'react';
import Menu from './Menus';
import Body from './Body';
import Header from './Encabezado';
import InicioS from './InicioS';
import './App.css';

function App() {
  const [menu, setMenu] = useState(false);
  const [vista, setVista] = useState("Inicio"); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Función para cerrar sesión
  const handleLogout = () => {
    setIsLoggedIn(false);
    setVista("Inicio");
  };

  return (
    <div className='Main'>
      {!isLoggedIn ? (
        <InicioS onLogin={() => {
            setIsLoggedIn(true);
            setVista("Inicio");
        }} />
      ) : (
        <>
          {/* Pasamos handleLogout al Header */}
          <Header 
            Open={() => setMenu(true)} 
            onLogout={handleLogout} 
          />
          <Menu 
            abierto={menu}
            cambiarVista={(v) => {
              setVista(v);
              setMenu(false);
            }}
          />
          <Body vista={vista} setVista={setVista} />
        </>
      )}
    </div>
  )
}

export default App;
