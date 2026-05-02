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

  // --------------------------------------------------------
  // CONFIGURAÇÃO DINÂMICA DO FORMULÁRIO
  // --------------------------------------------------------
  const configuracoesTema = [
    {
      titulo: "Plano de Fundo",
      campos: [
        { label: "Fundo da Aplicação", chave: "fundoAplicacao" },
        { label: "Fundo Secundário", chave: "fundoSecundario" }
      ]
    },
    {
      titulo: "Textos",
      campos: [
        { label: "Texto Principal", chave: "corTextoPrincipal" },
        { label: "Texto Secundário", chave: "corTextoSecundario" }
      ]
    },
    {
      titulo: "Botões",
      campos: [
        { label: "Cor Primária", chave: "corPrimaria" },
        { label: "Hover Primário", chave: "corPrimariaHover" }
      ]
    },
    {
      titulo: "Componentes",
      campos: [
        { label: "Fundo Tabela", chave: "fundoTabela" },
        { label: "Borda Tabela", chave: "bordaTabela" },
        { label: "Fundo Aside", chave: "fundoAside" },
        { label: "Fundo Input", chave: "fundoInput" }
      ]
    }
  ];

  return (
    <div style={{ padding: "30px" }}>

      <h2>⚙️ Configurações de Tema</h2>
      <p>Personalize as cores da aplicação.</p>

      {/* ---------------------------------------------------- */}
      {/* RENDERIZAÇÃO DINÂMICA */}
      {/* ---------------------------------------------------- */}
      {configuracoesTema.map(function (grupo) {

        return (
          <div key={grupo.titulo} style={{ marginTop: "30px" }}>

            <h3>{grupo.titulo}</h3>

            {grupo.campos.map(function (campo) {

              return (
                <div key={campo.chave} style={{ marginTop: "15px" }}>

                  <label>{campo.label}</label>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

                    <input
                      type="color"
                      value={temaAtual[campo.chave]}
                      onChange={function (e) {
                        alterarCor(campo.chave, e.target.value);
                      }}
                    />
                  </div>

                </div>
              );
            })}

          </div>
        );

      })}

      {/* ---------------------------------------------------- */}
      {/* BOTÃO RESTAURAR */}
      {/* ---------------------------------------------------- */}
      <div style={{ marginTop: "30px" }}>

        <button onClick={restaurarTemaPadrao}>
          Restaurar Tema Padrão
        </button>

      </div>

    </div>
  );
}

export default TelaConfiguracoes;