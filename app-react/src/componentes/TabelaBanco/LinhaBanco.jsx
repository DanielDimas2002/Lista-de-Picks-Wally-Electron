import React, { useState } from "react";

function LinhaBanco({ indice, nome, valor, aoEditarValor, aoExcluir }) {

  const [editando, setEditando] = useState(false);
  const [novoValor, setNovoValor] = useState(valor);

  function ativarEdicao() {
    setEditando(true);
  }

  function confirmarEdicao() {

    const valorConvertido = parseInt(novoValor);

    if (!isNaN(valorConvertido)) {
      aoEditarValor(indice, valorConvertido);
    }

    setEditando(false);
  }

  function lidarComTecla(e) {

    if (e.key === "Enter") {
      confirmarEdicao();
    }
  }

  return (
    <tr>

      <td>{nome}</td>

      <td onClick={ativarEdicao} className="celula-editavel">
        {editando ? (
          <input
            type="number"
            value={novoValor}
            autoFocus
            onChange={(e) => setNovoValor(e.target.value)}
            onBlur={confirmarEdicao}
            onKeyDown={lidarComTecla}
          />
        ) : (
          <span title="Clique para editar">
            {valor}
          </span>
        )}
      </td>

      {/* 🗑️ Coluna de ações */}
      <td>
        <button
          title="Excluir entrada"
          onClick={() => aoExcluir(indice)}
        >
          🗑️
        </button>
      </td>

    </tr>
  );
}

export default LinhaBanco;