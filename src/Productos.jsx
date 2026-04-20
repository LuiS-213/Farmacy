import { useState, useEffect } from "react";
import "./Productos.css";

function Productos({ setVista }) {
    // 1. ESTADO DE PRODUCTOS (Inicia como array vacío)
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [filtro, setFiltro] = useState("");

    // 🧾 ESTADOS DEL FORMULARIO
    const [mostrarForm, setMostrarForm] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [idEditando, setIdEditando] = useState(null);

    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        fecha_caducidad: "",
        id_categoria: "",
        imagen: ""
    });

    // 2. CARGA INICIAL
    useEffect(() => {
        obtenerMedicamentos();
    }, []);

    const obtenerMedicamentos = () => {
        fetch('http://localhost:8000/api/medicamentos')
            .then(res => {
                // Si el servidor responde 400 o 500, lanzamos error para caer en el catch
                if (!res.ok) throw new Error("Error en la respuesta del servidor");
                return res.json();
            })
            .then(data => {
                // Validamos que 'data' sea un arreglo antes de guardarlo
                setProductos(Array.isArray(data) ? data : []);
            })
            .catch(err => {
                console.error("Error al cargar medicamentos:", err);
                setProductos([]); // Si falla, aseguramos que sea un array vacío
            });
    };

    // 🔎 BUSCADOR (Protegido contra nulos)
    const handleBuscar = () => {
        setFiltro(busqueda);
    };

    // Filtro seguro: validamos que 'productos' sea array y que 'p.nombre' exista
    const productosFiltrados = (Array.isArray(productos) ? productos : []).filter((p) =>
        p.nombre?.toLowerCase().includes(filtro.toLowerCase())
    );

    // ➕ / ✏️ GUARDAR (CREATE & UPDATE)
    const handleSubmit = (e) => {
        e.preventDefault();

        const url = modoEdicion 
            ? `http://localhost:8000/api/medicamento/${idEditando}` 
            : 'http://localhost:8000/api/medicamentos';
        
        const metodo = modoEdicion ? 'PUT' : 'POST';

        fetch(url, {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoProducto)
        })
        .then(res => {
            if (!res.ok) throw new Error("Error al guardar");
            return res.json();
        })
        .then(() => {
            obtenerMedicamentos(); // Recargamos la lista desde la BD para estar seguros
            cerrarFormulario();
        })
        .catch(err => console.error("Error al procesar producto:", err));
    };

    // ✏️ PREPARAR EDICIÓN
    const handleEditar = (producto) => {
        setNuevoProducto({
            nombre: producto.nombre || "",
            descripcion: producto.descripcion || "",
            precio: producto.precio || "",
            stock: producto.stock || "",
            fecha_caducidad: producto.fecha_caducidad || "",
            id_categoria: producto.id_categoria || "",
            imagen: producto.imagen || ""
        });
        setIdEditando(producto.id_medicamento);
        setModoEdicion(true);
        setMostrarForm(true);
    };

    // 🗑️ ELIMINAR (DELETE)
    const handleEliminar = (id) => {
        if (!window.confirm("¿Seguro que deseas eliminar este medicamento?")) return;

        fetch(`http://localhost:8000/api/medicamento/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (res.ok) {
                setProductos(productos.filter((p) => p.id_medicamento !== id));
            } else {
                alert("No se pudo eliminar el producto.");
            }
        })
        .catch(err => console.error("Error al eliminar:", err));
    };

    const cerrarFormulario = () => {
        setNuevoProducto({ nombre: "", descripcion: "", precio: "", stock: "", fecha_caducidad: "", id_categoria: "", imagen: "" });
        setModoEdicion(false);
        setIdEditando(null);
        setMostrarForm(false);
    };

    return (
        <div className="contenedor-principal">
            <header className="productos-header">
                <h1>Medicamentos</h1>
                <div className="busqueda-box">
                    <input
                        type="text"
                        placeholder="Buscar medicamento..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <button onClick={handleBuscar}>Buscar</button>
                </div>
                <button className="btn-agregar" onClick={() => setMostrarForm(true)}>
                    + Agregar medicamento
                </button>
            </header>

            {mostrarForm && (
                <div className="modal-overlay">
                    <form className="formulario" onSubmit={handleSubmit}>
                        <h2>{modoEdicion ? "Editar medicamento" : "Nuevo medicamento"}</h2>
                        <input type="text" placeholder="Nombre" value={nuevoProducto.nombre} onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })} required />
                        <input type="text" placeholder="Descripción" value={nuevoProducto.descripcion} onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })} />
                        <input type="number" step="0.01" placeholder="Precio" value={nuevoProducto.precio} onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })} required />
                        <input type="number" placeholder="Stock" value={nuevoProducto.stock} onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })} />
                        <input type="date" value={nuevoProducto.fecha_caducidad} onChange={(e) => setNuevoProducto({ ...nuevoProducto, fecha_caducidad: e.target.value })} />
                        <input type="number" placeholder="ID Categoría" value={nuevoProducto.id_categoria} onChange={(e) => setNuevoProducto({ ...nuevoProducto, id_categoria: e.target.value })} />
                        <input type="text" placeholder="URL Imagen" value={nuevoProducto.imagen} onChange={(e) => setNuevoProducto({ ...nuevoProducto, imagen: e.target.value })} />
                        
                        <div className="form-botones">
                            <button type="submit" className="btn-guardar">{modoEdicion ? "Actualizar" : "Guardar"}</button>
                            <button type="button" className="btn-cancelar" onClick={cerrarFormulario}>Cancelar</button>
                        </div>
                    </form>
                </div>
            )}

            <main className="grid-productos">
                {productosFiltrados.length > 0 ? (
                    productosFiltrados.map((producto) => (
                        <article key={producto.id_medicamento} className="tarjeta-producto">
                            <img src={producto.image || "https://placehold.co/150x150?text=Sin+Imagen"} alt={producto.nombre} />
                            <div className="producto-info">
                                <h2>{producto.nombre}</h2>
                                <p className="desc">{producto.descripcion}</p>
                                <p className="precio">${producto.precio}</p>
                                <p className="stock">Stock: <span>{producto.stock}</span></p>
                                <div className="acciones">
                                    <button className="btn-cart" onClick={() => setVista("carrito")}>Añadir</button>
                                    <button className="btn-edit" onClick={() => handleEditar(producto)}>✏️</button>
                                    <button className="btn-delete" onClick={() => handleEliminar(producto.id_medicamento)}>🗑️</button>
                                </div>
                            </div>
                        </article>
                    ))
                ) : (
                    <p className="no-datos">No hay medicamentos disponibles o hubo un error al cargar.</p>
                )}
            </main>
        </div>
    );
}

export default Productos;