import React from "react";


function LinhaVida({ indice, nome, vidas, aoReduzirVida }) {
  return (
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
      </td>
    </tr>
  );
}

export default LinhaVida;
