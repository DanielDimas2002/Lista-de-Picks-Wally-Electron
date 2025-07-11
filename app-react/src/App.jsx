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
    setPicks([...picks, { nome, vidas: parseInt(vidas) }]);
  };

  const handleCadastrarVida = (nome, vidas) => {
    setVidas([...vidas, { nome, vidas: parseInt(vidas) }]);
  };

  const handleCadastrarBanco = (nome, valor) => {
    setBanco([...banco, { nome, valor: parseInt(valor) }]);
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
