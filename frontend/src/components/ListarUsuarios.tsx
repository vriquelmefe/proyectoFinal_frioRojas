import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";


const ListarUsuarios = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Necesitas iniciar sesión para ver la lista de usuarios");
            return;
        }
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:3000/usuarios", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
  
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
  
                const usersData = await response.json();
                setUsers(usersData);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Lista de Usuarios</h2>
            <Table striped bordered hover responsive>
                <thead >
                    <tr>
                        <th  style={{ backgroundColor: "#1D1F3D", color: "white" }}>ID</th>
                        <th  style={{ backgroundColor: "#1D1F3D", color: "white" }}>Nombre</th>
                        <th  style={{ backgroundColor: "#1D1F3D", color: "white" }}>Email</th>
                        <th  style={{ backgroundColor: "#1D1F3D", color: "white" }}>Rol</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id_usuario}>
                            <td>{user.id_usuario}</td>
                            <td>{user.nombre}</td>    
                            <td>{user.email}</td> 
                            <td>{user.rol}</td>    
                        </tr>
                    ))}
                </tbody>
            </Table>
            <style>
                {
                    `
                    .bg-frioRojas{
                        background-color: #1D1F3D;
                    }
                    `
                }
            </style>
        </div>
    );
    };
export default ListarUsuarios;
