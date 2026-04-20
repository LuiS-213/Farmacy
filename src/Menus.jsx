import './Menus.css'

function Menu({ abierto, cambiarVista, setAbierto }) {
    // Simplificamos la asignación de la clase con un ternario
    const name = abierto ? "OpenMenu" : "CloseMenu";

    return (
        <div className={name}>
            {/* Botón de retroceder / cerrar */}
            <div className="menu-header">
                <button 
    className="btn-retroceder" 
    onClick={() => {
        if (typeof setAbierto === 'function') {
            setAbierto(false);
        } else {
            console.error("Error: setAbierto no llegó como función. Valor recibido:", setAbierto);
        }
    }}
>
    ← Volver
</button>
            </div>

            <ul>
                <li onClick={() => cambiarVista("Inicio")}>Inicio</li>
                <li onClick={() => cambiarVista("Productos")}>Productos</li>
                <li onClick={() => cambiarVista("Ventas")}>Ventas</li>
                <li onClick={() => cambiarVista("Reportes")}>Reportes</li>
                <li onClick={() => cambiarVista("Usuarios")}>Usuarios</li>
            </ul>
        </div>
    )
}

export default Menu;