// temaPadrao.js
// ------------------------------------------------------------
// Este arquivo define o tema visual padrão do sistema.
// Ele centraliza todas as cores utilizadas na aplicação,
// permitindo:
//
// ✔ reutilização em qualquer componente
// ✔ fácil restauração do tema original
// ✔ futura integração com React Context
// ✔ persistência em JSON posteriormente
//
// Importante:
// - Todos os nomes estão em português
// - Estrutura clara para facilitar manutenção
// - Organização pensada para crescimento do sistema
// ------------------------------------------------------------

const temaPadrao = {
    
    // --------------------------------------------------------
    // CORES GERAIS DO SISTEMA
    // --------------------------------------------------------
    fundoAplicacao: "#0f172a",        // Fundo principal da aplicação
    fundoSecundario: "#1e293b",       // Fundo de cards, tabelas e aside
    corTextoPrincipal: "#e2e8f0",     // Texto padrão
    corTextoSecundario: "#94a3b8",    // Texto menos destacado

    // --------------------------------------------------------
    // CORES DE DESTAQUE
    // --------------------------------------------------------
    corPrimaria: "#3b82f6",           // Botões principais
    corPrimariaHover: "#25ebeb",      // Hover do botão principal
    corPerigo: "#ef4444",             // Ações destrutivas (ex: remover)
    corAviso: "#f59e0b",              // Avisos
    corSucesso: "#10b981",            // Feedback positivo

    // --------------------------------------------------------
    // COMPONENTES ESPECÍFICOS DO SISTEMA
    // (pensado para suas tabelas e Aside)
    // --------------------------------------------------------
    fundoTabela: "#020617",
    bordaTabela: "#334155",

    fundoAside: "#020617",
    bordaAside: "#334155",

    fundoInput: "#020617",
    bordaInput: "#475569",

    // --------------------------------------------------------
    // CONFIGURAÇÕES VISUAIS EXTRAS
    // --------------------------------------------------------
    sombraPadrao: "0 4px 12px rgba(0, 0, 0, 0.4)",
    raioBordaPadrao: "8px"
};

// Exportação tradicional para uso no sistema
export default temaPadrao;