import React, { useState } from "react";
import styles from "./LinhaBanco.module.css";

function LinhaBanco({ indice, nome, valor, aoEditarValor }) {
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
    <tr className={styles.linha}>
      <td>{nome}</td>
      <td onClick={ativarEdicao} className={styles.valor}>
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
          <span title="Clique para editar">{valor}</span>
        )}
      </td>
    </tr>
  );
}

export default LinhaBanco;
