import React, { useState } from "react";

function Historico() {
    const [idCliente, setIdCliente] = useState("");
    const [transacciones, setTransacciones] = useState([]);
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    const buscarHistorico = async () => {
        if (!idCliente.trim()) {
            setError("Por favor ingrese un número de cuenta.");
            return;
        }

        try {
            setCargando(true);
            setError("");
            setTransacciones([]);

            const response = await fetch(`/api/transactions/${idCliente.trim()}`);

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            setTransacciones(data);

        } catch (err) {
            console.error("Error en la búsqueda:", err);
            setError("Error: " + err.message);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Histórico de Transacciones</h2>

            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Número de cuenta (ej: 123456)"
                    value={idCliente}
                    onChange={(e) => setIdCliente(e.target.value)}
                    style={{ padding: "8px", marginRight: "10px", width: "200px" }}
                />
                <button
                    onClick={buscarHistorico}
                    disabled={cargando}
                    style={{ padding: "8px 15px" }}
                >
                    {cargando ? "Buscando..." : "Buscar"}
                </button>
            </div>

            {error && (
                <div style={{ color: "red", padding: "10px", border: "1px solid red" }}>
                    {error}
                </div>
            )}

            <table
                border="1"
                style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
            >
                <thead>
                <tr style={{ backgroundColor: "#f5f5f5" }}>
                    <th style={{ padding: "10px" }}>#</th>
                    <th style={{ padding: "10px" }}>Cuenta Origen</th>
                    <th style={{ padding: "10px" }}>Cuenta Destino</th>
                    <th style={{ padding: "10px" }}>Monto</th>
                </tr>
                </thead>
                <tbody>
                {transacciones.map((t, index) => (
                    <tr key={t.id || index}>
                        <td style={{ padding: "8px", textAlign: "center" }}>{index + 1}</td>
                        <td style={{ padding: "8px" }}>{t.senderAccountNumber}</td>
                        <td style={{ padding: "8px" }}>{t.receiverAccountNumber}</td>
                        <td style={{ padding: "8px", textAlign: "right" }}>
                            ${t.amount}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {transacciones.length === 0 && !cargando && !error && (
                <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                    No hay datos para mostrar
                </div>
            )}
        </div>
    );
}

export default Historico;
