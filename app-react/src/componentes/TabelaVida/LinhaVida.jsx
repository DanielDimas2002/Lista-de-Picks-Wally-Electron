import React from "react";


function LinhaVida({
  indice,
  nome,
  vidas,
  ativo,
  aoReduzirVida,
  aoAdicionarVida,
  aoExcluir
}) {
  return (
    <tr>
      <td className={!ativo ? "inativo" : ""}>{nome}</td>
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