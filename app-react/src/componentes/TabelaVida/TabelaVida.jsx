import React from "react";
import LinhaVida from "./LinhaVida";


function TabelaVida({ vidas, aoReduzirVida }) {
  return (
    <section className="tabela-container">
      <h1>❤️ Tabela Vida</h1>
      <table>
        <thead>
          <tr>
            <th>Jogador</th>
            <th>Vidas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vidas.map((jogador, indice) => (
            <LinhaVida
              key={indice}
              indice={indice}
              nome={jogador.nome}
              vidas={jogador.vidas}
              aoReduzirVida={aoReduzirVida}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default TabelaVida;