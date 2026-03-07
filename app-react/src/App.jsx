import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Menu from './componentes/Menu/Menu';
import Aside from "./componentes/Aside/Aside";
import TabelaVida from "./componentes/TabelaVida/TabelaVida";
import TabelaPick from "./componentes/TabelaPick/TabelaPick";
import TabelaBanco from "./componentes/TabelaBanco/TabelaBanco";
import { TemaProvider, useTema } from "./contexto/TemaContext";

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
    const novaVida = { nome, vidas: parseInt(vidas) };
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

  // 🛡️ Reduz 1 vida do jogador na TabelaVida e persiste no JSON
  function reduzirVidaJogador(indice) {

    // Cria uma cópia da lista atual (imutabilidade)
    const novaLista = [...listaVidas];

    // Reduz a vida do jogador selecionado
    novaLista[indice].vidas--;

    // Remove jogadores com 0 vidas (opcional, mas mantém padrão dos picks)
    const listaFiltrada = novaLista.filter(function (jogador) {
      return jogador.vidas > 0;
    });

    // Atualiza o estado
    setListaVida(listaFiltrada);

    // 🔄 Atualiza o JSON com a nova lista completa
    window.api.atualizarDados("vidas", listaFiltrada);
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
          display: "flex",
          backgroundColor: temaAtual.fundoAplicacao,
          color: temaAtual.corTextoPrincipal,
          minHeight: "100vh"
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <TemaProvider>
      <LayoutAplicacao>
        <div style={{ flex: 1, paddingTop: "60px" }}>
          <Menu />
          <Routes>
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
              />} />
            <Route path="/banco" element={
              <TabelaBanco
                banco={listaBanco}
                aoEditarValor={editarValorBanco}
              />} />
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
