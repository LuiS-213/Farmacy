import { useState } from 'react';


function ReporteVentas({ setVista }) {
    // Datos de prueba con el rol de vendedor
    const [ventas] = useState([
        { id: "F-001", fecha: "2026-04-10", vendedor: "Carlos Ruiz", items: 3, total: 150.20, metodo: "Efectivo" },
        { id: "F-002", fecha: "2026-04-10", vendedor: "Ana Beltrán", items: 1, total: 45.00, metodo: "Tarjeta" },
        { id: "F-003", fecha: "2026-04-10", vendedor: "Carlos Ruiz", items: 5, total: 89.90, metodo: "Efectivo" },
        { id: "F-004", fecha: "2026-04-10", vendedor: "Marta Gómez", items: 2, total: 210.50, metodo: "Transferencia" }
    ]);

    return (
        <div>
            <h1>Reporte de Ventas por Vendedor</h1>

            <table>
                <thead>
                    <tr>
                        <th>Folio</th>
                        <th>Fecha</th>
                        <th>Vendedor</th>
                        <th>Cant. Artículos</th>
                        <th>Total</th>
                        <th>Método de Pago</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta) => (
                        <tr key={venta.id}>
                            <td>{venta.id}</td>
                            <td>{venta.fecha}</td>
                            <td>{venta.vendedor}</td>
                            <td>{venta.items} pza(s)</td>
                            <td>${venta.total.toFixed(2)}</td>
                            <td>{venta.metodo}</td>
                            <td>
                                <button>Detalles</button>
                                <button>Imprimir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ReporteVentas;