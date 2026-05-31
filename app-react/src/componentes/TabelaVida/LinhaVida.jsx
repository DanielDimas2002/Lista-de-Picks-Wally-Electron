import React, { useState } from "react";


function LinhaVida({
  indice,
  nome,
  vidas,
  ativo,
  aoEditarNome,
  aoReduzirVida,
  aoAdicionarVida,
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
        className={`${!ativo ? "inativo" : ""
          } celula-editavel`}
        onClick={() => setEditandoNome(true)}
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
      
      <td className={!ativo ? "inativo" : ""}>{vidas}</td>

      <td>
        <button
          title="Reduzir 1 vida"
          onClick={() => aoReduzirVida(indice)}
          disabled={!ativo} // opcional (recomendado)
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
          title="Excluir jogador"
          onClick={() => aoExcluir(indice)}
        >
          🗑️
        </button>
      </td>
    </tr>
  );
}

export default LinhaVida;