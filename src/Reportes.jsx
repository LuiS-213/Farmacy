import { useState, useEffect } from 'react';
import "./Reportes.css";

function ReporteInventario() {
    // 1. Empezamos con el inventario vacío
    const [inventario, setInventario] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    // 2. Cargar los datos reales al abrir el reporte
    useEffect(() => {
        obtenerInventario();
    }, []);

    const obtenerInventario = () => {
        // Usamos la ruta que ya tienes para listar medicamentos
        fetch('http://localhost:8000/api/medicamentos')
            .then(res => res.json())
            .then(data => {
                setInventario(Array.isArray(data) ? data : []);
            })
            .catch(err => console.error("Error al cargar inventario:", err));
    };

    // 🔎 Filtro de búsqueda
    const filtrados = inventario.filter(item =>
        item.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    // 🎨 Lógica de estados con colores (opcional, para que se vea pro en tu TSU)
    const getEstado = (stock) => {
        if (stock <= 0) return { texto: "Agotado", clase: "estado-agotado" };
        if (stock < 20) return { texto: "Stock Bajo", clase: "estado-bajo" };
        return { texto: "Disponible", clase: "estado-disponible" };
    };

    return (
        <div className="inventario-container">
            <h1>Reporte de Inventario Real</h1>

            <div className="inventario-buscador">
                <input
                    type="text"
                    placeholder="Buscar medicamento por nombre..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                <button className="btn-limpiar" onClick={() => setBusqueda("")}>
                    Limpiar
                </button>
            </div>

            <table className="inventario-tabla">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Categoría</th>
                        <th>Stock Actual</th>
                        <th>Precio Unitario</th>
                        <th>Caducidad</th>
                        <th>Estatus</th>
                    </tr>
                </thead>

                <tbody>
                    {filtrados.length > 0 ? (
                        filtrados.map((item) => {
                            const estado = getEstado(item.stock);
                            return (
                                <tr key={item.id_medicamento}>
                                    <td><strong>{item.nombre}</strong></td>
                                    <td>{item.descripcion}</td>
                                    <td>{item.categoria || 'General'}</td>
                                    <td>{item.stock} unidades</td>
                                    <td>${Number(item.precio).toFixed(2)}</td>
                                    <td>{item.fecha_caducidad}</td>
                                    <td>
                                        <span className={`badge ${estado.clase}`}>
                                            {estado.texto}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: 'center' }}>
                                No se encontraron medicamentos en la base de datos.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ReporteInventario;