import { useState } from 'react';


function GestionUsuarios({ setVista }) {
    // Datos de prueba para las cuentas de la farmacia
    const [usuarios] = useState([
        { 
            id: 1, 
            nombre: "Carlos Ruiz", 
            rol: "Administrador", 
            usuario: "cruiz_admin", 
            estado: "Activo",
            ultimaConexion: "2026-04-10 08:30"
        },
        { 
            id: 2, 
            nombre: "Ana Beltrán", 
            rol: "Vendedor", 
            usuario: "abeltran_farm", 
            estado: "Activo",
            ultimaConexion: "2026-04-10 14:15"
        },
        { 
            id: 3, 
            nombre: "Marta Gómez", 
            rol: "Vendedor", 
            usuario: "mgomez_ventas", 
            estado: "Inactivo",
            ultimaConexion: "2026-03-28 18:00"
        },
        { 
            id: 4, 
            nombre: "Luis Torres", 
            rol: "Almacenista", 
            usuario: "ltorres_inventario", 
            estado: "Activo",
            ultimaConexion: "2026-04-09 10:00"
        }
    ]);

    return (
        <div>
            <h1>Gestión de Usuarios y Accesos</h1>
            
            <button>Registrar Nuevo Usuario</button>

            <div>
                {usuarios.map((u) => (
                    <div key={u.id}>
                        {/* Espacio para avatar o iniciales */}
                        <div>[👤]</div>
                        
                        <h2>{u.nombre}</h2>
                        <p><strong>Usuario:</strong> {u.usuario}</p>
                        <p><strong>Rol de Sistema:</strong> {u.rol}</p>
                        <p><strong>Estado:</strong> {u.estado}</p>
                        <p><strong>Última entrada:</strong> {u.ultimaConexion}</p>
                        
                        <button>Editar Perfil</button>
                        <button>Cambiar Contraseña</button>
                        
                        {/* Botón condicional según el estado */}
                        {u.estado === "Activo" ? 
                            <button>Desactivar Cuenta</button> : 
                            <button>Reactivar Cuenta</button>
                        }
                        
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GestionUsuarios;