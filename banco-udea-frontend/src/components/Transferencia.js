import React, { useState } from "react";

function Transferencia() {
    const [form, setForm] = useState({
        senderAccountNumber: "",
        receiverAccountNumber: "",
        amount: ""
    });
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:8080/api/transactions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })
            .then(async (res) => {
                if (!res.ok) {
                    const errorMsg = await res.text();
                    throw new Error(errorMsg);
                }
                return res.json();
            })
            .then(() => {
                setMensaje("Transferencia realizada con éxito ✅");
                setError("");
            })
            .catch((err) => {
                setError(err.message);
                setMensaje("");
            });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Transferencia de Dinero</h2>

            <form onSubmit={handleSubmit}>
                <table border="1" style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                    <thead>
                    <tr style={{ backgroundColor: "#f5f5f5" }}>
                        <th style={{ padding: "10px" }}>Cuenta Origen</th>
                        <th style={{ padding: "10px" }}>Cuenta Destino</th>
                        <th style={{ padding: "10px" }}>Monto</th>
                        <th style={{ padding: "10px" }}>Acción</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td style={{ padding: "10px" }}>
                            <input
                                name="senderAccountNumber"
                                placeholder="Número de cuenta origen"
                                onChange={handleChange}
                                style={{ width: "96%", padding: "6px" }}
                            />
                        </td>
                        <td style={{ padding: "10px" }}>
                            <input
                                name="receiverAccountNumber"
                                placeholder="Número de cuenta destino"
                                onChange={handleChange}
                                style={{ width: "96%", padding: "6px" }}
                            />
                        </td>
                        <td style={{ padding: "10px" }}>
                            <input
                                name="amount"
                                type="number"
                                placeholder="Monto"
                                onChange={handleChange}
                                style={{ width: "96%", padding: "6px" }}
                            />
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                            <button type="submit">Transferir</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>

            {mensaje && <p style={{ color: "green", marginTop: "15px" }}>{mensaje}</p>}
            {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
        </div>
    );
}

export default Transferencia;
