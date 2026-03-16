function Header({Open}) {
  return (
    <header className="Header">
      <button type="button"  className="boton-menu"  onClick={Open}>☰</button>
      <h1>Mi Sistema</h1>
    </header>
  );
}
export default Header