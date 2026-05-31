import React from "react";


function LinhaPick({
    indice,
    nome,
    vidas,
    aoReduzirVida,
    aoAdicionarVida,
    aoSubir,
    aoDescer,
    aoMoverParaTopo,
    aoExcluir
}) {
    return (
        <tr>
            <td>{nome}</td>
            <td>{vidas}</td>
            <td>

                <button
                    title="Reduzir 1 vida"
                    onClick={() => aoReduzirVida(indice)}
                >
                    💔
                </button>
                <button
                    title="Adicionar 1 vida"
                    onClick={() => aoAdicionarVida(indice)}
                >
                    ❤️
                </button>
                <button
                    title="Mover para o topo"
                    onClick={() => aoMoverParaTopo(indice)}
                    disabled={indice === 0}
                >
                    ⏫
                </button>

                <button
                    title="Mover para cima"
                    onClick={() => aoSubir(indice)}
                    disabled={indice === 0}
                >
                    🔼
                </button>

                <button
                    title="Mover para baixo"
                    onClick={() => aoDescer(indice)}
                    disabled={false}
                >
                    🔽
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