import React from 'react';

function Reportes() {
  
  const datosReporte = [
    { id: 101, producto: "Paracetamol", cantidad: 50, estado: "En Stock", total: 2250 },
    { id: 102, producto: "Amoxicilina", cantidad: 12, estado: "Stock Bajo", total: 1740 },
    { id: 103, producto: "Alcohol Etílico", cantidad: 0, estado: "Agotado", total: 0 },
    { id: 104, producto: "Vitamina C", cantidad: 100, estado: "En Stock", total: 12000 },
  ];

  return (
    <div>
      <h1>Reporte de Inventario</h1>
      <p>Resumen detallado de existencias y valor total.</p>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Estado</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          {datosReporte.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.producto}</td>
              <td>{item.cantidad} unidades</td>
              <td>
                {item.estado}
              </td>
              <td>${item.total.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button>
          Imprimir Reporte (PDF)
        </button>
      </div>
    </div>
  );
}

export default Reportes;