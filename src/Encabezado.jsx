import './Encabezado.css'

function Header({Open, onLogout}) {
  return (
    <header className="Header">
      <button type="button"  className="boton-menu"  onClick={Open}>☰</button>
      <h1>Farmacia</h1>
      
      <button type="button" className="boton-salir" onClick={onLogout}>⎗</button>
    </header>
  );
}
export default Header