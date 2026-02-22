// TemaContext.jsx
// ------------------------------------------------------------
// Contexto global responsável por gerenciar o tema visual
// da aplicação.
//
// Funções principais:
// ✔ armazenar o tema atual
// ✔ fornecer o tema para toda a aplicação
// ✔ permitir atualização do tema
// ✔ permitir restauração do tema padrão
//
// Observação importante:
// Neste momento o tema ainda NÃO é persistido em JSON.
// A persistência será integrada posteriormente.
//
// Padrões adotados:
// - nomes em português
// - sintaxe tradicional
// - funções explícitas
// - estrutura preparada para expansão
// ------------------------------------------------------------

import React, { createContext, useContext, useState } from "react";

// Importa o tema oficial do sistema
import temaPadrao from "../temas/temaPadrao";


// ------------------------------------------------------------
// 1️⃣ CRIAÇÃO DO CONTEXTO
// ------------------------------------------------------------
// O contexto armazenará:
//
// temaAtual → objeto com todas as cores
// atualizarTema → função para alterar o tema
// restaurarTemaPadrao → função para resetar
// ------------------------------------------------------------
const TemaContext = createContext();


// ------------------------------------------------------------
// 2️⃣ COMPONENTE PROVIDER
// ------------------------------------------------------------
// Este componente envolve a aplicação e disponibiliza
// o tema para todos os componentes filhos.
// ------------------------------------------------------------
function TemaProvider({ children }) {

    // --------------------------------------------------------
    // ESTADO PRINCIPAL DO TEMA
    // --------------------------------------------------------
    // O sistema inicia SEMPRE com o tema padrão.
    // Futuramente aqui será feita a leitura do JSON.
    // --------------------------------------------------------
    const [temaAtual, setTemaAtual] = useState(temaPadrao);


    // --------------------------------------------------------
    // FUNÇÃO PARA ATUALIZAR O TEMA
    // --------------------------------------------------------
    // Recebe um novo objeto de tema e substitui o atual.
    //
    // Importante:
    // Não estamos fazendo merge automático aqui.
    // O objeto deve ser completo para manter previsibilidade.
    // --------------------------------------------------------
    function atualizarTema(novoTema) {
        setTemaAtual(novoTema);
    }


    // --------------------------------------------------------
    // FUNÇÃO PARA RESTAURAR TEMA PADRÃO
    // --------------------------------------------------------
    // Volta o sistema para o estado original confiável.
    // Esta função será usada na tela de configurações.
    // --------------------------------------------------------
    function restaurarTemaPadrao() {
        setTemaAtual(temaPadrao);
    }


    // --------------------------------------------------------
    // OBJETO DISPONIBILIZADO PELO CONTEXTO
    // --------------------------------------------------------
    // Tudo que a aplicação poderá acessar do tema.
    // --------------------------------------------------------
    const valorContexto = {
        temaAtual: temaAtual,
        atualizarTema: atualizarTema,
        restaurarTemaPadrao: restaurarTemaPadrao
    };


    // --------------------------------------------------------
    // RENDERIZAÇÃO DO PROVIDER
    // --------------------------------------------------------
    // "children" representa toda a aplicação.
    // --------------------------------------------------------
    return (
        <TemaContext.Provider value={valorContexto}>
            {children}
        </TemaContext.Provider>
    );
}


// ------------------------------------------------------------
// 3️⃣ HOOK PERSONALIZADO PARA USAR O TEMA
// ------------------------------------------------------------
// Facilita o uso do contexto em qualquer componente.
// Evita importar useContext manualmente.
// ------------------------------------------------------------
function useTema() {
    const contexto = useContext(TemaContext);

    if (contexto === undefined) {
        throw new Error("useTema deve ser usado dentro de um TemaProvider");
    }

    return contexto;
}


// ------------------------------------------------------------
// EXPORTAÇÕES
// ------------------------------------------------------------
export { TemaProvider, useTema };