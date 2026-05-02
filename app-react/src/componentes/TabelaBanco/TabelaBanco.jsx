import React from "react";
import LinhaBanco from "./LinhaBanco";


function TabelaBanco({ banco, aoEditarValor }) {
  return (
    <section>
      <h1>💰 Tabela Banco</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Créditos</th>
          </tr>
        </thead>
        <tbody>
          {banco.map((entrada, indice) => (
            <LinhaBanco
              key={indice}
              indice={indice}
              nome={entrada.nome}
              valor={entrada.valor}
              aoEditarValor={aoEditarValor}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default TabelaBanco;
