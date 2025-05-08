import './App.css';
import { Routes, Route } from 'react-router-dom';
import Menu from './componentes/Menu/Menu';
import TabelaVida from "./componentes/TabelaVida/TabelaVida";
import TabelaPick from "./componentes/TabelaPick/TabelaPick";
import TabelaBanco from "./componentes/TabelaBanco/TabelaBanco";


function App() {
  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path='/picks' element={<TabelaPick />} />
        <Route path='/vida' element={<TabelaVida />} />
        <Route path='/banco' element={<TabelaBanco />} />
      </Routes>
    </div>
  );
}

export default App;
