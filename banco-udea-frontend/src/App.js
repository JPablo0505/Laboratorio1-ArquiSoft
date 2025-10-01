import React from "react";
import Clientes from "./components/Clientes";
import Transferencia from "./components/Transferencia";
import Historico from "./components/Historico";

function App() {
    return (
        <div>
            <h1>Banco UdeA</h1>
            <Clientes />
            <Transferencia />
            <Historico />
        </div>
    );
}

export default App;
