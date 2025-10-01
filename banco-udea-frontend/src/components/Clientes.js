import React, { useEffect, useState } from "react";

function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [error, setError] = useState("");

    const cargarClientes = () => {
        fetch("http://localhost:8080/api/customers")
            .then((res) => {
                if (!res.ok) throw new Error("Error al cargar clientes");
                return res.json();
            })
            .then((data) => {
                console.log("Clientes recibidos:", data); // 👈 DEBUG
                setClientes(data);
            })
            .catch((err) => {
                console.error("Error cargando clientes:", err);
                setError("No se pudieron cargar los clientes.");
            });
    };

    useEffect(() => {
        cargarClientes();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Lista de Clientes</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <table border="1" style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                <thead>
                <tr style={{ backgroundColor: "#f5f5f5" }}>
                    <th style={{ padding: "10px" }}>ID</th>
                    <th style={{ padding: "10px" }}>Nombre</th>
                    <th style={{ padding: "10px" }}>Número de Cuenta</th>
                    <th style={{ padding: "10px" }}>Saldo</th>
                </tr>
                </thead>
                <tbody>
                {clientes.map((c) => (
                    <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.firstName} {c.lastName}</td>
                        <td>{c.accountNumber}</td>
                        <td style={{ textAlign: "right" }}>${c.balance}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {clientes.length === 0 && !error && (
                <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                    No hay clientes registrados
                </div>
            )}

            {/* 🔄 Botón opcional para refrescar manualmente */}
            <button onClick={cargarClientes} style={{ marginTop: "15px" }}>
                🔄 Actualizar lista
            </button>
        </div>
    );
}

export default Clientes;
