import { useState } from 'react';


function ReporteInventario({ setVista }) {
    // Datos de prueba para el inventario
    const [inventario] = useState([
        { id: 1, codigo: "750123", producto: "Paracetamol 500mg", stock: 150, stockMinimo: 50, precio: 10.50 },
        { id: 2, codigo: "750456", producto: "Amoxicilina 250mg", stock: 12, stockMinimo: 20, precio: 85.00 },
        { id: 3, codigo: "750789", producto: "Vitamina C 1g", stock: 0, stockMinimo: 15, precio: 45.00 },
        { id: 4, codigo: "750321", producto: "Alcohol 500ml", stock: 85, stockMinimo: 30, precio: 25.50 }
    ]);

    return (
        <div>
            <h1>Reporte de Inventario</h1>

            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Producto</th>
                        <th>Stock Actual</th>
                        <th>Stock Mínimo</th>
                        <th>Precio</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {inventario.map((item) => (
                        <tr key={item.id}>
                            <td>{item.codigo}</td>
                            <td>{item.producto}</td>
                            <td>{item.stock} unidades</td>
                            <td>{item.stockMinimo}</td>
                            <td>${item.precio}</td>
                            <td>
                                {item.stock <= 0 ? "Agotado" : 
                                 item.stock < item.stockMinimo ? "Bajo Stock" : "OK"}
                            </td>
                            <td>
                                <button>Editar</button>
                                <button>Historial</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ReporteInventario;