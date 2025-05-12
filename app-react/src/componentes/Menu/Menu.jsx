// src/componentes/Menu/Menu.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Menu.module.css";

function Menu() {
    return (
        <header className={styles.header}>
            <h1 className={styles.titulo}>Sistema do Wally</h1>
            <nav className={styles.nav}>
                <Link to="/picks" className={styles.link}>📋 Picks</Link>
                <Link to="/vidas" className={styles.link}>❤️ Vidas</Link>
                <Link to="/banco" className={styles.link}>💰 Banco</Link>
            </nav>
        </header>
    );
}
export default Menu