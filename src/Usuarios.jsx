import { useState, useEffect } from 'react';
import "./Usuarios.css";

function GestionUsuarios() {
    const [usuarios, setUsuarios] = useState([]); 
    const [busqueda, setBusqueda] = useState("");
    const [mostrarForm, setMostrarForm] = useState(false);
    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombre: "", correo: "", password: "", id_rol: 2, foto: ""
    });

    // 1. Cargar datos del Back-end al iniciar
    useEffect(() => {
        fetch('http://localhost:8000/api/usuarios') 
            .then((res) => res.json())
            .then((data) => setUsuarios(data))
            .catch((err) => console.error("Error al cargar:", err));
    }, []);

    const filtrados = usuarios.filter(u =>
        u.nombre?.toLowerCase().includes(busqueda.toLowerCase())
    );

    // --- AGREGAR (Mantiene tu lógica + fetch) ---
    const agregarUsuario = () => {
        if (!nuevoUsuario.nombre || !nuevoUsuario.correo || !nuevoUsuario.password) {
            alert("Completa todos los campos");
            return;
        }

        fetch('http://localhost:8000/api/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: nuevoUsuario.nombre,
                correo: nuevoUsuario.correo,
                password: nuevoUsuario.password,
                id_rol: nuevoUsuario.id_rol,
                perfil: nuevoUsuario.foto // Ligamos tu campo foto al perfil de la BD
            })
        })
        .then(res => res.json())
        .then(usuarioGuardado => {
            // Actualizamos la lista con lo que nos devolvió el servidor (ya trae su ID real)
            setUsuarios([...usuarios, usuarioGuardado]);
            setNuevoUsuario({ nombre: "", correo: "", password: "", id_rol: 2, foto: "" });
            setMostrarForm(false);
        })
        .catch(err => alert("Error al guardar en la base de datos"));
    };

    // --- EDITAR ---
    const editarUsuario = (user) => {
        const nuevoNombre = prompt("Nuevo nombre:", user.nombre);
        if (!nuevoNombre) return;

        fetch(`http://localhost:8000/api/usuario/${user.id_usuario}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...user, nombre: nuevoNombre })
        })
        .then(res => {
            if (res.ok) {
                // Solo si el Back aceptó, cambiamos el nombre en la pantalla
                setUsuarios(usuarios.map(u => u.id_usuario === user.id_usuario ? { ...u, nombre: nuevoNombre } : u));
            }
        });
    };

    // --- ACTIVAR / DESACTIVAR (Toggle) ---
    const toggleEstado = (user) => {
        const nuevoEstado = user.estado === "Activo" ? "Inactivo" : "Activo";

        fetch(`http://localhost:8000/api/usuario/${user.id_usuario}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...user, estado: nuevoEstado })
        })
        .then(res => {
            if (res.ok) {
                setUsuarios(usuarios.map(u => u.id_usuario === user.id_usuario ? { ...u, estado: nuevoEstado } : u));
            }
        });
    };

    // --- ELIMINAR (Aquí es donde se quita el usuario) ---
    const eliminarUsuario = (id) => {
        if (!window.confirm("¿Eliminar usuario?")) return;

        fetch(`http://localhost:8000/api/usuario/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (res.ok) {
                // Filtramos la lista para que desaparezca de la pantalla
                setUsuarios(usuarios.filter(u => u.id_usuario !== id));
            } else {
                alert("El servidor no permitió eliminar al usuario");
            }
        })
        .catch(err => console.error("Error:", err));
    };

    const getRol = (id) => {
        if (id === 1) return "Administrador";
        if (id === 2) return "Vendedor";
        if (id === 3) return "Almacenista";
        return "Desconocido";
    };

    return (
        <div className="usuarios-container">
            <div className="usuarios-header">
                <h1 className="usuarios-titulo">Gestión de Usuarios</h1>
                <div className="usuarios-controles">
                    <input
                        type="text"
                        placeholder="Buscar usuario..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <button onClick={() => setBusqueda("")}>Limpiar</button>
                    <button onClick={() => setMostrarForm(!mostrarForm)}>
                        {mostrarForm ? "Cancelar" : "Registrar Usuario"}
                    </button>
                </div>
            </div>

            {mostrarForm && (
                <div className="usuarios-form">
                    <input type="text" placeholder="Nombre" value={nuevoUsuario.nombre} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })} />
                    <input type="email" placeholder="Correo" value={nuevoUsuario.correo} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, correo: e.target.value })} />
                    <input type="password" placeholder="Password" value={nuevoUsuario.password} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })} />
                    <input type="text" placeholder="URL foto" value={nuevoUsuario.foto} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, foto: e.target.value })} />
                    <select value={nuevoUsuario.id_rol} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, id_rol: Number(e.target.value) })}>
                        <option value={1}>Administrador</option>
                        <option value={2}>Vendedor</option>
                        <option value={3}>Almacenista</option>
                    </select>
                    <button onClick={agregarUsuario}>Guardar</button>
                </div>
            )}

            <div className="usuarios-lista">
                {filtrados.map((u) => (
                    <div key={u.id_usuario} className="usuario-card">
                        <div className="usuario-avatar">
                            {(u.perfil || u.foto) ? <img src={u.perfil || u.foto} alt="avatar" /> : "👤"}
                        </div>
                        <div className="usuario-info">
                            <h3>{u.nombre}</h3>
                            <p>{u.correo}</p>
                            <p>{getRol(u.id_rol)}</p>
                            <p className={u.estado === "Activo" ? "activo" : "inactivo"}>
                                {u.estado || "Sin estado"}
                            </p>
                        </div>
                        <div className="usuario-acciones">
                            <button onClick={() => editarUsuario(u)}>Editar</button>
                            <button onClick={() => toggleEstado(u)}>
                                {u.estado === "Activo" ? "Desactivar" : "Activar"}
                            </button>
                            <button onClick={() => eliminarUsuario(u.id_usuario)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GestionUsuarios;