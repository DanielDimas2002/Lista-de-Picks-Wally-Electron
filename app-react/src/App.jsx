import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Menu from './componentes/Menu/Menu';
import Aside from "./componentes/Aside/Aside"
import TabelaVida from "./componentes/TabelaVida/TabelaVida";
import TabelaPick from "./componentes/TabelaPick/TabelaPick";
import TabelaBanco from "./componentes/TabelaBanco/TabelaBanco";

function App() {

  const [listaVidas, setListaVida] = useState([
    { nome: "Jogador 1", vidas: 3 },
    { nome: "Jogador 2", vidas: 6 },
    { nome: "Jogador 3", vidas: 8 },
  ]);

  const [banco, setBanco] = useState([]);

  const [listaPicks, setListaPicks] = useState([
    { nome: "Ahri", vidas: 3 },
    { nome: "Lux", vidas: 3 },
    { nome: "Jhin", vidas: 3 },
  ])

  // 🛡️ Reduz 1 vida do campeão selecionado
  function reduzirVida(indice) {
    const novaLista = [...listaPicks];
    novaLista[indice].vidas--;
    setListaPicks(novaLista);
  }

  // 🛡️ Reduz 1 vida do jogador na TabelaVida
  function reduzirVidaJogador(indice) {
    const novaLista = [...listaVidas];
    novaLista[indice].vidas--;
    setListaVida(novaLista);
  }


  // ⬆️ Move o campeão uma posição acima
  function subirLinha(indice) {
    if (indice === 0) return; // já está no topo

    const novaLista = [...listaPicks];
    const item = novaLista[indice];
    novaLista.splice(indice, 1); // remove do lugar atual
    novaLista.splice(indice - 1, 0, item); // insere na posição acima
    setListaPicks(novaLista);
  }

  // 🗑️ Remove o campeão da lista
  function excluirPick(indice) {
    const novaLista = listaPicks.filter((_, i) => i !== indice);
    setListaPicks(novaLista);
  }

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
    setBanco([...banco, novoCredito]);
    window.api.salvarDados("banco", novoCredito); // Salvando no JSON
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, paddingTop: "60px" }}>
        <Menu />
        <Routes>
          <Route path="/picks" element={<TabelaPick listaPicks={listaPicks} aoReduzirVida={reduzirVida} aoSubir={subirLinha} aoExcluir={excluirPick} />} />
          <Route path="/vidas" element={<TabelaVida vidas={listaVidas} aoReduzirVida={reduzirVidaJogador} />} />
          <Route path="/banco" element={<TabelaBanco banco={banco} />} />
        </Routes>
      </div>
      <Aside
        handleCadastrarPick={handleCadastrarPick}
        handleCadastrarVida={handleCadastrarVida}
        handleCadastrarBanco={handleCadastrarBanco}
      />
    </div>
  );
}

export default App;
