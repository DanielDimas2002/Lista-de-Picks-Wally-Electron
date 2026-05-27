// ------------------------------------------------------------
// JSON → React
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

        corTextoBotao: json.textos.corTextoBotao,

        corPerigo: json.destaques.corDestaque,
        corAviso: "#f59e0b",
        corSucesso: "#10b981",

        sombraPadrao: "0 4px 12px rgba(0,0,0,0.4)",
        raioBordaPadrao: "8px"
    };
}


// ------------------------------------------------------------
// React → JSON
// ------------------------------------------------------------
function converterTemaParaJson(tema) {

    return {

        planoFundo: {
            corFundoGeral: tema.fundoAplicacao,
            corFundoMenu: tema.fundoSecundario,
            corFundoTabela: tema.fundoTabela,
            corFundoAside: tema.fundoAside,
            corFundoLinha: tema.fundoInput
        },

        textos: {
            corTextoPrincipal: tema.corTextoPrincipal,
            corTextoTabela: tema.corTextoSecundario,
            corTextoBotao: tema.corTextoBotao
        },

        botoes: {
            corBotaoPrincipal: tema.corPrimaria,
            corBotaoHover: tema.corPrimariaHover
        },

        bordas: {
            corBordaTabela: tema.bordaTabela,
            corBordaInputs: tema.bordaInput
        },

        destaques: {
            corDestaque: tema.corPerigo
        }

    };
}


// ------------------------------------------------------------
// EXPORTAÇÃO
// ------------------------------------------------------------
export {
    converterJsonParaTema,
    converterTemaParaJson
};