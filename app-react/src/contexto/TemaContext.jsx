// ------------------------------------------------------------
// Contexto global responsável por gerenciar o tema visual
// da aplicação.
//
// Funções principais:
// ✔ armazenar o tema atual
// ✔ fornecer o tema para toda a aplicação
// ✔ permitir atualização do tema
// ✔ permitir restauração do tema padrão
// ✔ carregar o tema salvo em JSON (Electron)
// ✔ persistir alterações automaticamente no JSON
//
// Observação importante:
// O sistema utiliza dois formatos de tema:
// - JSON estruturado (armazenamento)
// - objeto flat (uso interno no React)
//
// A conversão entre esses formatos é feita por:
// converterJsonParaTema e converterTemaParaJson
//
// Padrões adotados:
// - nomes em português
// - sintaxe tradicional
// - funções explícitas
// - separação entre dados e interface
// - estrutura preparada para expansão
// ------------------------------------------------------------


import React, { createContext, useContext, useState, useEffect } from "react";
import {
    converterJsonParaTema,
    converterTemaParaJson
} from "../temas/conversorTema";

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
    // O sistema inicia com o tema padrão como fallback seguro.
    //
    // Após a inicialização, o tema salvo no JSON (Electron)
    // será carregado e aplicado automaticamente.
    //
    // Isso garante:
    // ✔ funcionamento mesmo sem arquivo JSON
    // ✔ recuperação de preferências do usuário
    // --------------------------------------------------------

    const [temaAtual, setTemaAtual] = useState(temaPadrao);


    // --------------------------------------------------------
    // FUNÇÃO PARA ATUALIZAR O TEMA
    // --------------------------------------------------------
    // Recebe um novo objeto de tema (formato interno React)
    // e substitui completamente o tema atual.
    //
    // Fluxo:
    // 1. Atualiza o estado global (React)
    // 2. Converte o tema para formato JSON estruturado
    // 3. Persiste os dados via Electron (window.api)
    //
    // Importante:
    // - Não há merge automático
    // - O objeto deve ser completo para evitar inconsistência
    // - A persistência acontece imediatamente após a alteração
    // --------------------------------------------------------

    function atualizarTema(novoTema) {

        setTemaAtual(novoTema);

        try {

            const jsonConvertido = converterTemaParaJson(novoTema);

            window.api.atualizarDados("tema", jsonConvertido);

            console.log("💾 Tema salvo no JSON");

        } catch (erro) {

            console.log("❌ Erro ao salvar tema:", erro);

        }
    }


    // --------------------------------------------------------
    // FUNÇÃO PARA RESTAURAR TEMA PADRÃO
    // --------------------------------------------------------
    // Restaura o sistema para o tema original definido
    // em temaPadrao.js.
    //
    // Fluxo:
    // 1. Atualiza o estado com o tema padrão
    // 2. Converte para formato JSON
    // 3. Sobrescreve o arquivo salvo
    //
    // Isso garante que:
    // ✔ o usuário volte ao estado inicial confiável
    // ✔ o tema restaurado persista após reiniciar o app
    // --------------------------------------------------------

    function restaurarTemaPadrao() {

        setTemaAtual(temaPadrao);

        try {

            const jsonConvertido = converterTemaParaJson(temaPadrao);

            window.api.atualizarDados("tema", jsonConvertido);

            console.log("♻️ Tema padrão restaurado");

        } catch (erro) {

            console.log("❌ Erro ao restaurar tema:", erro);

        }
    }


    // --------------------------------------------------------
    // EFEITO DE CARREGAMENTO DO TEMA
    // --------------------------------------------------------
    // Executado uma única vez ao iniciar a aplicação.
    //
    // Responsável por:
    // 1. Ler o arquivo JSON via Electron
    // 2. Converter os dados para o formato interno
    // 3. Aplicar o tema carregado no estado global
    //
    // Isso permite:
    // ✔ manter preferências do usuário
    // ✔ sincronizar interface com dados persistidos
    // ✔ inicialização dinâmica do tema
    //
    // Caso ocorra erro:
    // O sistema mantém o tema padrão como fallback
    // --------------------------------------------------------

    useEffect(function () {

        async function carregarTema() {

            try {

                const temaJson = await window.api.lerDados("tema");

                if (temaJson) {

                    const temaConvertido = converterJsonParaTema(temaJson);

                    setTemaAtual(temaConvertido);

                    console.log("🎨 Tema carregado do JSON");

                }

            } catch (erro) {

                console.log("❌ Erro ao carregar tema:", erro);

            }

        }

        carregarTema();

    }, []);

    // --------------------------------------------------------
    // OBJETO DISPONIBILIZADO PELO CONTEXTO
    // --------------------------------------------------------
    // Define tudo que pode ser acessado globalmente:
    //
    // temaAtual → estado atual do tema
    // atualizarTema → altera e persiste o tema
    // restaurarTemaPadrao → reseta e persiste o tema
    // --------------------------------------------------------

    const valorContexto = {
        temaAtual,
        atualizarTema,
        restaurarTemaPadrao
    };


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