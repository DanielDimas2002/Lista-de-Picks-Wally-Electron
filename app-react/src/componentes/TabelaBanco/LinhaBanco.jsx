import React, { useState } from "react";

function LinhaBanco({
  indice,
  nome,
  valor,
  aoEditarNome,
  aoEditarValor,
  aoExcluir
}) {

  const [editandoNome, setEditandoNome] = useState(false);
  const [editandoValor, setEditandoValor] = useState(false);

  const [novoNome, setNovoNome] = useState(nome);
  const [novoValor, setNovoValor] = useState(valor);

  function ativarEdicaoValor() {
    setEditandoValor(true);
  }

  function confirmarValor() {

    const valorConvertido = parseInt(novoValor);

    if (!isNaN(valorConvertido)) {
      aoEditarValor(
        indice,
        valorConvertido
      );
    }

    setEditandoValor(false);

  }

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

  function lidarComTeclaValor(e) {

    if (e.key === "Enter") {
      confirmarValor();
    }

  }

  function lidarComTeclaNome(e) {

    if (e.key === "Enter") {
      confirmarNome();
    }

  }

  return (
    <tr>

      {/* Nome */}
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
            onKeyDown={lidarComTeclaNome}
          />

        ) : (

          <span title="Clique para editar">
            {nome}
          </span>

        )}

      </td>

      {/* Valor */}
      <td
        onClick={ativarEdicaoValor}
        className="celula-editavel"
      >

        {editandoValor ? (

          <input
            type="number"
            value={novoValor}
            autoFocus
            onChange={(e) =>
              setNovoValor(e.target.value)
            }
            onBlur={confirmarValor}
            onKeyDown={lidarComTeclaValor}
          />

        ) : (

          <span title="Clique para editar">
            {valor}
          </span>

        )}

      </td>

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