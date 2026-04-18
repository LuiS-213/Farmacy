import { useState } from 'react';

function Productos({ setVista }) {
    // Agregamos datos de prueba directamente aquí para que se vea algo
    const [productos] = useState([
        { id: 1, title: "Paracetamol", price: 10.50, category: "Farmacia", image: "https://placehold.co/150x150" },
        { id: 2, title: "Vitamina C", price: 25.00, category: "Suplementos", image: "https://placehold.co/150x150" },
        { id: 3, title: "Alcohol Gel", price: 15.00, category: "Higiene", image: "https://placehold.co/150x150" },
        { id: 4, title: "Gasas Estériles", price: 5.00, category: "Curación", image: "https://placehold.co/150x150" }
    ]);

    // Dejamos el loading en false para que no bloquee la vista
    const [loading] = useState(false);

    if (loading) return <p className="cargando">Cargando catálogo...</p>;

    return (
        <div className="contenedor-principal">
            <header className="productos-header">
                <h1>Nuestros Productos</h1>
            </header>
            
            <main className="grid-productos">
                {productos.map((producto) => (
                    <article key={producto.id} className="tarjeta-producto">
                        <div className="imagen-wrapper">
                            <img src={producto.image} alt={producto.title} style={{width: '100px'}} />
                        </div>
                        
                        <div className="info-producto">
                            <span className="categoria">{producto.category}</span>
                            <h2>{producto.title}</h2> 
                            <p className="precio"><strong>${producto.price}</strong></p>
                            
                            <div className="acciones">
                                <button className="btn-carrito">Añadir al carrito</button>
                                <button className="btn-editar">Editar</button>
                                <button className="btn-eliminar">Eliminar</button>
                            </div>
                        </div>
                    </article>
                ))}            
            </main>
        </div>
    );
}

export default Productos;