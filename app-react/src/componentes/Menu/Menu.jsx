// src/componentes/Menu/Menu.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Menu.module.css";
import { useTema } from "../../contexto/TemaContext";

function Menu() {

    const { temaAtual } = useTema();

    return (
        <header
            className={styles.header}
            style={{
                backgroundColor: temaAtual.fundoSecundario,
                color: temaAtual.corTextoPrincipal,
                borderBottom: `1px solid ${temaAtual.bordaTabela}`
            }}
        >
            <h1 className={styles.titulo}>Sistema do Wally</h1>

            <nav className={styles.nav}>
                <Link
                    to="/picks"
                    className={styles.link}
                    style={{ color: temaAtual.corTextoPrincipal }}
                >
                    📋 Picks
                </Link>

                <Link
                    to="/vidas"
                    className={styles.link}
                    style={{ color: temaAtual.corTextoPrincipal }}
                >
                    ❤️ Vidas
                </Link>

                <Link
                    to="/banco"
                    className={styles.link}
                    style={{ color: temaAtual.corTextoPrincipal }}
                >
                    💰 Banco
                </Link>
            </nav>
        </header>
    );
}
export default Menu