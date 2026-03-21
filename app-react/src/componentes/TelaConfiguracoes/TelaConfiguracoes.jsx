import React from "react";
import { useTema } from "../../contexto/TemaContext";

function TelaConfiguracoes() {

  const { temaAtual, atualizarTema, restaurarTemaPadrao } = useTema();

  function alterarCor(propriedade, valor) {

    const novoTema = {
      ...temaAtual,
      [propriedade]: valor
    };

    atualizarTema(novoTema);
  }

  return (
    <div style={{ padding: "30px" }}>

      <h2>⚙️ Configurações de Tema</h2>

      <p>Personalize as cores da aplicação.</p>

      <div style={{ marginTop: "20px" }}>

        <label>Fundo da Aplicação</label>

        <input
          type="color"
          value={temaAtual.fundoAplicacao}
          onChange={(e) => alterarCor("fundoAplicacao", e.target.value)}
        />

      </div>

      <div style={{ marginTop: "20px" }}>

        <label>Cor do Texto</label>

        <input
          type="color"
          value={temaAtual.corTextoPrincipal}
          onChange={(e) => alterarCor("corTextoPrincipal", e.target.value)}
        />

      </div>

      <div style={{ marginTop: "20px" }}>

        <label>Cor Primária</label>

        <input
          type="color"
          value={temaAtual.corPrimaria}
          onChange={(e) => alterarCor("corPrimaria", e.target.value)}
        />

      </div>

      <div style={{ marginTop: "30px" }}>

        <button onClick={restaurarTemaPadrao}>
          Restaurar Tema Padrão
        </button>

      </div>

    </div>
  );
}

export default TelaConfiguracoes;