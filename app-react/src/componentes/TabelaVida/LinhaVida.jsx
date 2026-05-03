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
    <tr style={{ opacity: ativo ? 1 : 0.4 }}>
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