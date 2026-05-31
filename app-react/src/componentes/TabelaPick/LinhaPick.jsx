import React, { useState } from "react";

function LinhaPick({
    indice,
    nome,
    vidas,
    aoEditarNome,
    aoReduzirVida,
    aoAdicionarVida,
    aoSubir,
    aoDescer,
    aoMoverParaTopo,
    aoExcluir
}) {

    const [editandoNome, setEditandoNome] = useState(false);

    const [novoNome, setNovoNome] = useState(nome);

    function confirmarNome() {

        const nomeLimpo = novoNome.trim();

        if (nomeLimpo !== "") {

            aoEditarNome(
                indice,
                nomeLimpo
            );

        }

        setEditandoNome(false);

    }

    return (
        <tr>
            <td
                onClick={() => setEditandoNome(true)}
                className="celula-editavel"
            >

                {editandoNome ? (

                    <input
                        type="text"
                        value={novoNome}
                        autoFocus
                        onChange={(e) =>
                            setNovoNome(e.target.value)
                        }
                        onBlur={confirmarNome}
                        onKeyDown={(e) => {

                            if (e.key === "Enter") {
                                confirmarNome();
                            }

                        }}
                    />

                ) : (

                    <span title="Clique para editar">
                        {nome}
                    </span>

                )}

            </td>
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