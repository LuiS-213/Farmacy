import "./NewVenta.css";
import { useState, useEffect } from "react";

function NewVentas({ setVista }) {
    const [carrito, setCarrito] = useState([]);
    const [productosBD, setProductosBD] = useState([]); // Aquí guardaremos los medicamentos de MySQL

    // 1. Cargar medicamentos reales al entrar a la vista
    useEffect(() => {
        fetch('http://localhost:8000/api/medicamentos')
            .then(res => res.json())
            .then(data => setProductosBD(data))
            .catch(err => console.error("Error cargando productos:", err));
    }, []);

    const agregar = (p) => {
        // Buscamos si ya está en el carrito para sumar cantidad en lugar de repetir fila
        const existe = carrito.find(item => item.id_medicamento === p.id_medicamento);
        if (existe) {
            setCarrito(carrito.map(item => 
                item.id_medicamento === p.id_medicamento 
                ? { ...item, cantidad: item.cantidad + 1 } 
                : item
            ));
        } else {
            setCarrito([...carrito, { ...p, cantidad: 1 }]);
        }
    };

    const quitarProducto = (index) => {
        setCarrito(carrito.filter((_, i) => i !== index));
    };

    const total = carrito.reduce(
        (acc, p) => acc + p.precio * p.cantidad,
        0
    );

    // 2. Función para confirmar la venta en el servidor
    const confirmarVenta = async () => {
        if (carrito.length === 0) return alert("El carrito está vacío");

        const ventaData = {
            fecha: new Date().toISOString().split('T')[0], // YYYY-MM-DD
            id_usuario: 1, // Por ahora fijo, luego usas el ID del que hizo login
            detalles: carrito.map(p => ({
                id_medicamento: p.id_medicamento,
                cantidad: p.cantidad,
                precio: p.precio,
                subtotal: p.precio * p.cantidad
            }))
        };

        try {
            const res = await fetch('http://localhost:8000/api/ventas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ventaData)
            });

            if (res.ok) {
                alert("¡Venta realizada con éxito!");
                setCarrito([]);
                setVista("historial");
            } else {
                alert("Error al procesar la venta");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="nueva-venta">
            <h1>Nueva Venta</h1>

            <div className="contenedor-flex">
                {/* 📦 PRODUCTOS REALES */}
                <div className="seccion productos-grid">
                    <h3>Medicamentos Disponibles</h3>
                    <div className="lista-scroll">
                        {productosBD.map(p => (
                            <div key={p.id_medicamento} className="producto-item">
                                <span>{p.nombre} - <b>${p.precio}</b></span>
                                <button className="btn-agregar" onClick={() => agregar(p)}>
                                    +
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 🛒 CARRITO */}
                <div className="seccion">
                    <h3>Carrito de Compras</h3>
                    {carrito.length === 0 ? <p>No hay artículos</p> : (
                        carrito.map((p, i) => (
                            <div key={i} className="carrito-item">
                                <span>{p.nombre} x {p.cantidad}</span>
                                <span>${(p.precio * p.cantidad).toFixed(2)}</span>
                                <button className="btn-quitar" onClick={() => quitarProducto(i)}>×</button>
                            </div>
                        ))
                    )}
                    <div className="total-caja">
                        <strong>Total: ${total.toFixed(2)}</strong>
                    </div>
                </div>
            </div>

            <div className="acciones">
                <button className="btn-confirmar" onClick={confirmarVenta}>Finalizar Venta</button>
                <button className="btn-cancelar" onClick={() => setVista("historial")}>Regresar</button>
            </div>
        </div>
    );
}

export default NewVentas;