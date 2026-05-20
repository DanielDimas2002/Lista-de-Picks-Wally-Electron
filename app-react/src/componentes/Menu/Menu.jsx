// src/componentes/Menu/Menu.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTema } from "../../contexto/TemaContext";

function Menu() {

    const { temaAtual } = useTema();

    return (
        <header
            className="header"
            style={{
                backgroundColor: temaAtual.fundoSecundario,
                color: temaAtual.corTextoPrincipal,
                borderBottom: `1px solid ${temaAtual.bordaTabela}`
            }}
        >
            <h1 className="titulo">Sistema do Wally</h1>

            <nav className="nav">

                <Link
                    to="/picks"
                    className="link"
                    style={{ color: temaAtual.corTextoPrincipal }}
                >
                    📋 Picks
                </Link>

                <Link
                    to="/vidas"
                    className="link"
                    style={{ color: temaAtual.corTextoPrincipal }}
                >
                    ❤️ Vidas
                </Link>

                <Link
                    to="/banco"
                    className="link"
                    style={{ color: temaAtual.corTextoPrincipal }}
                >
                    💰 Banco
                </Link>

                <Link
                    to="/configuracoes"
                    className="link"
                    style={{ color: temaAtual.corTextoPrincipal }}
                >
                    ⚙️ Configurações
                </Link>

            </nav>
        </header>
    );
}

export default Menu;