import React, {useState} from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Menu from './componentes/Menu/Menu';
import Aside from "./componentes/Aside/Aside"
import TabelaVida from "./componentes/TabelaVida/TabelaVida";
import TabelaPick from "./componentes/TabelaPick/TabelaPick";
import TabelaBanco from "./componentes/TabelaBanco/TabelaBanco";



function App() {
  
  const [picks, setPicks] = useState([]);
  const [vidas, setVidas] = useState([]);
  const [banco, setBanco] = useState([]);

  const handleCadastrarPick = (nome, vidas) => {
    const novoPick = { nome, vidas: parseInt(vidas) };
    console.log("✅ Recebido no App:", novoPick);
    setPicks([...picks, novoPick]);
    window.api.salvarDados("picks", novoPick); // Salvando no JSON
  };

  const handleCadastrarVida = (nome, vidas) => {
    const novaVida = { nome, vidas: parseInt(vidas) };
    console.log("✅ Recebido no App:", novaVida);
    setVidas([...vidas, novaVida]);
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
          <Route path="/picks" element={<TabelaPick picks={picks} />} />
          <Route path="/vidas" element={<TabelaVida vidas={vidas} />} />
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
