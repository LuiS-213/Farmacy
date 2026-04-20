import { useState, useEffect } from "react";
import "./Ventas.css";

function ReporteVentas({ setVista }) {
    // 1. Iniciamos con un array vacío para llenar con la BD
    const [ventas, setVentas] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [filtroFecha, setFiltroFecha] = useState("");

    // 2. Carga de datos desde el servidor
    useEffect(() => {
        obtenerVentas();
    }, []);

    const obtenerVentas = () => {
        // Ajusta esta URL a tu ruta de backend (ej. /api/ventas)
        fetch('http://localhost:8000/api/ventas')
            .then(res => {
                if (!res.ok) throw new Error("Error al obtener historial");
                return res.json();
            })
            .then(data => {
                setVentas(Array.isArray(data) ? data : []);
            })
            .catch(err => {
                console.error("Error:", err);
                setVentas([]);
            });
    };

    // 🔎 Filtro combinado (Protegido contra valores nulos)
    const ventasFiltradas = (Array.isArray(ventas) ? ventas : []).filter((v) => {
        // Si el vendedor es null (vendedor no asignado), usamos "Desconocido"
        const nombreVendedor = v.vendedor || "Desconocido";
        
        const coincideNombre = nombreVendedor
            .toLowerCase()
            .includes(busqueda.toLowerCase());

        const coincideFecha = filtroFecha
            ? v.fecha === filtroFecha
            : true;

        return coincideNombre && coincideFecha;
    });

    // 🗑️ Eliminar venta en la BD
    const eliminarVenta = (id) => {
        const ok = window.confirm("¿Seguro que deseas eliminar este registro de venta?");
        if (!ok) return;

        fetch(`http://localhost:8000/api/venta/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (res.ok) {
                setVentas(ventas.filter(v => v.id_venta !== id));
            } else {
                alert("No se pudo eliminar la venta.");
            }
        })
        .catch(err => console.error("Error al eliminar:", err));
    };

    return (
        <div className="historial-ventas">
            <header className="header-ventas">
                <h1>Historial de Ventas</h1>
            </header>

            <div className="filtros">
                <input
                    type="text"
                    placeholder="Buscar por vendedor..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />

                <input
                    type="date"
                    value={filtroFecha}
                    onChange={(e) => setFiltroFecha(e.target.value)}
                />

                <button
                    className="btn-limpiar"
                    onClick={() => {
                        setBusqueda("");
                        setFiltroFecha("");
                    }}
                >
                    Limpiar
                </button>
                
                <button
                    className="btn-nueva"
                    onClick={() => setVista("NewVenta")}
                >
                    Nueva venta
                </button>
            </div>

            <table className="tabla-ventas">
                <thead>
                    <tr>
                        <th>Folio</th>
                        <th>Fecha</th>
                        <th>Vendedor</th>
                        <th>Artículos</th>
                        <th>Total</th>
                        <th>Método</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {ventasFiltradas.length > 0 ? (
                        ventasFiltradas.map((venta) => (
                            <tr key={venta.id_venta}>
                                <td>{venta.id_venta}</td>
                                <td>{venta.fecha}</td>
                                <td>{venta.vendedor || "N/A"}</td>
                                <td>{venta.items || 0}</td>
                                <td>${Number(venta.total).toFixed(2)}</td>
                                <td>{venta.metodo}</td>
                                <td>
                                    <button
                                        className="btn-eliminar"
                                        onClick={() => eliminarVenta(venta.id_venta)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="no-datos">No se encontraron registros de ventas.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ReporteVentas;