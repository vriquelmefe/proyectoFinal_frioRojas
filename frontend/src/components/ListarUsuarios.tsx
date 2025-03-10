import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";


const ListarUsuarios = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchUsers = async () => {
            if (!token) {
                alert("Necesitas iniciar sesión para ver la lista de usuarios");
                return;
            }
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
    }, [users]);

        return (
            <div className="container mt-5">
                <h2 className="text-center mb-4">Lista de Usuarios</h2>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user}>
                                <td>{user}</td>
                                {/* <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.rol}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    };
export default ListarUsuarios;
