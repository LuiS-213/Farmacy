import './Menus.css'

function Menu({abierto,cambiarVista}){
    let name="";
    if(abierto){
        name="OpenMenu";
    }else{
        name="CloseMenu";
    }

    return(
        <div className={name}>
            <ul>
                <li onClick={()=>cambiarVista("InicioS")}>Inicio de Sesion</li>
                <li onClick={()=>cambiarVista("Inicio")}>Inicio</li>
                <li onClick={()=>cambiarVista("Productos")}>Productos</li>
                <li onClick={()=>cambiarVista("Ventas")}>Ventas</li>
                <li onClick={()=>cambiarVista("Reportes")}>Reportes</li>
                <li onClick={()=>cambiarVista("Usuarios")}>Usuarios</li>
            </ul>
        </div>
    )
}

export default Menu;