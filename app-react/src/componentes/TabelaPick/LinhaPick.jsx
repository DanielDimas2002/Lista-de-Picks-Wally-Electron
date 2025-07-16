import React from "react";
import styles from "./LinhaPick.module.css"

function LinhaPick({indice, nome, vidas, aoReduzirVida, aoSubir, aoExcluir}){
    return(
        <tr className={styles.linha}> 
            <td>{nome}</td>
            <td>{vidas}</td>
            <td className={styles.acoes}>
                <button
                title="Reduzir 1 vida"
                onClick={() => aoReduzirVida(indice)}
                >
                    🛡️
                </button>
                <button 
                title="Mover para cima"
                onClick={() => aoSubir(indice)} disabled = {indice === 0}
                >
                    ⬆️
                </button>

                <button 
                title="Excluir Campeão"
                onClick={() => aoExcluir(indice)}
                >
                    🗑️
                </button>
            </td>
        </tr>
    )
}
export default LinhaPick