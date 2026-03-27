// conversorTema.js
// ------------------------------------------------------------
// Converte o formato do JSON para o formato interno do React
// ------------------------------------------------------------

function converterJsonParaTema(json) {

    return {

        fundoAplicacao: json.planoFundo.corFundoGeral,
        fundoSecundario: json.planoFundo.corFundoMenu,

        corTextoPrincipal: json.textos.corTextoPrincipal,
        corTextoSecundario: json.textos.corTextoTabela,

        corPrimaria: json.botoes.corBotaoPrincipal,
        corPrimariaHover: json.botoes.corBotaoHover,

        fundoTabela: json.planoFundo.corFundoTabela,
        bordaTabela: json.bordas.corBordaTabela,

        fundoAside: json.planoFundo.corFundoAside,
        bordaAside: json.bordas.corBordaTabela,

        fundoInput: json.planoFundo.corFundoLinha,
        bordaInput: json.bordas.corBordaInputs,

        corPerigo: json.destaques.corDestaque,
        corAviso: "#f59e0b",
        corSucesso: "#10b981",

        sombraPadrao: "0 4px 12px rgba(0,0,0,0.4)",
        raioBordaPadrao: "8px"
    };
}

export { converterJsonParaTema };