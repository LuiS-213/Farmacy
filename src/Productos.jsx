
import { useEffect, useState } from 'react';

function Productos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    const obtenerProductos = async () => {
        try {
            const response = await api.get("/products");
            setProductos(response.data);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    if (loading) return <p className="cargando">Cargando catálogo...</p>;

    return (
        <div className="contenedor-principal">
            <RegistrarProductos
                productoEditando={productoSeleccionado}
                limpiarSeleccion={() => setProductoSeleccionado(null)}
                onActualizacionExitosa={obtenerProductos}
            />
            
            <header className="productos-header">
                <h1>Nuestros Productos</h1>
            </header>
            
            <main className="grid-productos">
                {productos.map((producto) => (
                    /* carta / tarjeta */
                    <article key={producto.id} className="tarjeta-producto">
                        <div className="imagen-wrapper">
                            <img src={producto.image} alt={producto.title} />
                        </div>
                        
                        <div className="info-producto">
                            <span className="categoria">{producto.category}</span>
                            <h2>{producto.title}</h2> 
                            <p className="descripcion">{producto.description}</p>
                            <p className="precio">${producto.price}</p>
                            
                            {/* Botones de accion */}
                            <button className="btn-carrito">Añadir al carrito</button>
                            <button className="btn-editar" onClick={() => setProductoSeleccionado(producto)}>
                                Editar
                            </button>
                            <button className="btn-eliminar" onClick={() => removeProducto(producto.id)}>
                                Eliminar
                            </button>
                        </div>
                    </article>
                ))}            
            </main>
        </div>
    );
}

export default Productos;