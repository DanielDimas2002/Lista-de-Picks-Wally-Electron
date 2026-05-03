import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Menu from './componentes/Menu/Menu';
import Aside from "./componentes/Aside/Aside";
import TabelaVida from "./componentes/TabelaVida/TabelaVida";
import TabelaPick from "./componentes/TabelaPick/TabelaPick";
import TabelaBanco from "./componentes/TabelaBanco/TabelaBanco";
import { TemaProvider, useTema } from "./contexto/TemaContext";
import TelaConfiguracoes from "./componentes/TelaConfiguracoes/TelaConfiguracoes";

function App() {

  // ================================
  // 📦 Estados das tabelas
  // ================================

  const [listaPicks, setListaPicks] = useState([]);
  const [listaVidas, setListaVida] = useState([]);
  const [listaBanco, setListaBanco] = useState([]);

  // Funções dos Formulário

  const handleCadastrarPick = (nome, vidas) => {
    const novoPick = { nome, vidas: parseInt(vidas) };
    console.log("✅ Recebido no App:", novoPick);
    setListaPicks([...listaPicks, novoPick]);
    window.api.salvarDados("picks", novoPick); // Salvando no JSON
  };

  const handleCadastrarVida = (nome, vidas) => {
    const novaVida = {
      nome,
      vidas: parseInt(vidas),
      ativo: true
    };
    console.log("✅ Recebido no App:", novaVida);
    setListaVida([...listaVidas, novaVida]);
    window.api.salvarDados("vidas", novaVida); // Salvando no JSON
  };

  const handleCadastrarBanco = (nome, valor) => {
    const novoCredito = { nome, valor: parseInt(valor) };
    console.log("✅ Recebido no App:", novoCredito);
    setListaBanco([...listaBanco, novoCredito]);
    window.api.salvarDados("banco", novoCredito); // Salvando no JSON
  };

  // 🛡️ Reduz 1 vida do campeão selecionado
  function reduzirVida(indice) {

    const novaLista = [...listaPicks];

    novaLista[indice].vidas--;

    const listaFiltrada = novaLista.filter(function (pick) {
      return pick.vidas > 0;
    });

    setListaPicks(listaFiltrada);

    window.api.atualizarDados("picks", listaFiltrada);

  }

  // ⬆️ Move o campeão uma posição acima
  function subirLinha(indice) {

    if (indice === 0) {
      return;
    }

    const novaLista = [...listaPicks];
    const item = novaLista[indice];

    novaLista.splice(indice, 1);
    novaLista.splice(indice - 1, 0, item);

    setListaPicks(novaLista);

    window.api.atualizarDados("picks", novaLista);

  }

  // 🗑️ Remove o campeão da lista
  function excluirPick(indice) {

    const novaLista = listaPicks.filter(function (_, i) {
      return i !== indice;
    });

    setListaPicks(novaLista);

    window.api.atualizarDados("picks", novaLista);

  }

  function reduzirVidaJogador(indice) {

    const novaLista = [...listaVidas];

    novaLista[indice].vidas--;

    // Se zerar
    if (novaLista[indice].vidas <= 0) {
      novaLista[indice].vidas = 0;
      novaLista[indice].ativo = false;

      // Move para o final
      const jogador = novaLista[indice];
      novaLista.splice(indice, 1);
      novaLista.push(jogador);
    }

    setListaVida(novaLista);
    window.api.atualizarDados("vidas", novaLista);
  }

  function adicionarVidaJogador(indice) {

    const novaLista = [...listaVidas];

    novaLista[indice].vidas++;

    // Se estava desativado → reativa
    if (!novaLista[indice].ativo) {
      novaLista[indice].ativo = true;
    }

    setListaVida(novaLista);
    window.api.atualizarDados("vidas", novaLista);
  }

  function excluirJogador(indice) {

    const novaLista = listaVidas.filter(function (_, i) {
      return i !== indice;
    });

    setListaVida(novaLista);
    window.api.atualizarDados("vidas", novaLista);
  }


  // 💰 Edita o Crédito e persiste no JSON
  function editarValorBanco(indice, novoValor) {

    // Cria uma cópia da lista atual (imutabilidade)
    const novaLista = [...listaBanco];

    // Atualiza o valor convertido para número
    novaLista[indice].valor = parseInt(novoValor);

    // Atualiza o estado
    setListaBanco(novaLista);

    // 🔄 Persiste a lista completa no JSON
    window.api.atualizarDados("banco", novaLista);
  }

  // 📥 Carrega os dados reais do JSON ao iniciar o aplicativo
  useEffect(function () {
    async function carregarDados() {
      try {
        const dadosPick = await window.api.lerDados("picks");
        const dadosVidas = await window.api.lerDados("vidas");
        const dadosBanco = await window.api.lerDados("banco");

        if (Array.isArray(dadosPick)) {
          setListaPicks(dadosPick);
        }
        if (Array.isArray(dadosVidas)) {
          setListaVida(dadosVidas);
        }
        if (Array.isArray(dadosBanco)) {
          setListaBanco(dadosBanco)
        }
        console.log("📥 Dados carregados do JSON com sucesso")
      } catch (erro) {
        console.log("❌ Erro ao carregar dados:", erro)
      }
    }

    carregarDados();
  }, []);

  function LayoutAplicacao({ children }) {

    const { temaAtual } = useTema();

    return (
      <div
        style={{
          backgroundColor: temaAtual.fundoAplicacao,
          color: temaAtual.corTextoPrincipal,
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <TemaProvider>
      <LayoutAplicacao>
        <div className="conteudo-principal">
          <Menu />
          <Routes>

            {/* 🔥 ROTA INICIAL */}
            <Route path="/" element={<Navigate to="/picks" />} />

            <Route path="/picks" element={
              <TabelaPick
                listaPicks={listaPicks}
                aoReduzirVida={reduzirVida}
                aoSubir={subirLinha}
                aoExcluir={excluirPick}
              />} />

            <Route path="/vidas" element={
              <TabelaVida
                vidas={listaVidas}
                aoReduzirVida={reduzirVidaJogador}
                aoAdicionarVida={adicionarVidaJogador}
                aoExcluir={excluirJogador}
              />
            } />

            <Route path="/banco" element={
              <TabelaBanco
                banco={listaBanco}
                aoEditarValor={editarValorBanco}
              />} />

            <Route path="/configuracoes" element={<TelaConfiguracoes />} />

          </Routes>
        </div>

        <Aside
          handleCadastrarPick={handleCadastrarPick}
          handleCadastrarVida={handleCadastrarVida}
          handleCadastrarBanco={handleCadastrarBanco}
        />
      </LayoutAplicacao>
    </TemaProvider>
  );
}

export default App;
