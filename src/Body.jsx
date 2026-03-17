import InicioS from "./InicioS"
import Inicio from "./Inicio"
import Productos from "./Productos"
import Ventas from "./Ventas"
import Reportes from "./Reportes"
import Usuarios from "./Usuarios"
import './Body.css'

function Body({ vista, setVista }) {
    console.log("La vista actual es:", vista);
    const vistas={
        InicioS: <InicioS onLogin={() => setVista("Ventas")} />, //cuando te logues correctamente cambiara segun lo que indique el setVista()
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