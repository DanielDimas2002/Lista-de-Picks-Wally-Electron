import React from "react";
import styles from "./TabelaVida.module.css";

function TabelaVida({ vidas }) {
  return (
    <section className={styles.container}>
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
            <tr key={indice}>
              <td>{jogador.nome}</td>
              <td>{jogador.vidas}</td>
              <td>
                <button title="Reduzir 1 vida">🛡️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default TabelaVida;
