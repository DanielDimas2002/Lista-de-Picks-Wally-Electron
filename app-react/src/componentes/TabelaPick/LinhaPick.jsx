import React from "react";


function LinhaPick({indice, nome, vidas, aoReduzirVida, aoSubir, aoExcluir}){
    return(
        <tr> 
            <td>{nome}</td>
            <td>{vidas}</td>
            <td>
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