import InicioS from "./InicioS"
import Inicio from "./Inicio"
import Productos from "./Productos"
import Ventas from "./Ventas"
import Reportes from "./Reportes"
import Usuarios from "./Usuarios"
import NewVentas from "./NewVenta"
import './Body.css'

function Body({ vista, setVista }) {
    //console.log("La vista actual es:", vista);
    const vistas = {
        InicioS: <InicioS onLogin={() => setVista("Ventas")} />, 
        Inicio: <Inicio setVista={setVista} />,
        Productos: <Productos setVista={setVista} />,
        Ventas: <Ventas setVista={setVista} />,
        NewVenta: <NewVentas setVista={setVista} />,
        Reportes: <Reportes setVista={setVista} />,
        Usuarios: <Usuarios setVista={setVista} />
    }
    return(
        <div className="Body">
            {vistas[vista] || <Inicio />}
            
        </div>
    )
}

export default Body