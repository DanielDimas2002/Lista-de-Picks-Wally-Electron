import React from "react";
import styles from "./LinhaVida.module.css";

function LinhaVida({ indice, nome, vidas, aoReduzirVida }) {
  return (
    <tr className={styles.linha}>
      <td>{nome}</td>
      <td>{vidas}</td>
      <td>
        <button
          title="Reduzir 1 vida"
          onClick={() => aoReduzirVida(indice)}
        >
          🛡️
        </button>
      </td>
    </tr>
  );
}

export default LinhaVida;
