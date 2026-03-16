import InicioS from "./InicioS"
import Inicio from "./Inicio"
import Productos from "./Productos"
import Ventas from "./Ventas"
import Reportes from "./Reportes"
import Usuarios from "./Usuarios"
import './Body.css'

function Body({vista}){
    console.log("La vista actual es:", vista);
    const vistas={
        InicioS:<InicioS/>,
        Inicio:<Inicio/>,
        Productos:<Productos/>,
        Ventas:<Ventas/>,
        Reportes:<Reportes/>,
        Usuarios:<Usuarios/>
}
    return(
        <div className="Body">
            {vistas[vista] || <Inicio />}
        </div>
    )
}

export default Body