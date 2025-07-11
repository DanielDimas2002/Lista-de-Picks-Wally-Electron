// Aside/Aside.jsx
import React, { useState } from "react";
import styles from "./Aside.module.css";

function Aside({ handleCadastrarPick, handleCadastrarVida, handleCadastrarBanco }) {
  // 🎯 Estados locais para os campos de input
  const [nomePick, setNomePick] = useState("");
  const [vidasPick, setVidasPick] = useState("");

  const [nomeVida, setNomeVida] = useState("");
  const [vidasVida, setVidasVida] = useState("");

  const [nomeBanco, setNomeBanco] = useState("");
  const [valorBanco, setValorBanco] = useState("");

  return (
    <aside className={styles.aside}>
      <h3>📋 Cadastro de Picks</h3>
      <input
        type="text"
        placeholder="Nome do Campeão"
        value={nomePick}
        onChange={(e) => setNomePick(e.target.value)}
      />
      <input
        type="number"
        placeholder="Vidas"
        value={vidasPick}
        onChange={(e) => setVidasPick(e.target.value)}
      />
      <button onClick={() => {
        console.log("📋Enviando Pick:", nomePick, vidasPick);
        handleCadastrarPick(nomePick, vidasPick);
      }}>
        Cadastrar Pick
      </button>

      <h3>❤️ Cadastro de Vidas</h3>
      <input
        type="text"
        placeholder="Nome do Jogador"
        value={nomeVida}
        onChange={(e) => setNomeVida(e.target.value)}
      />
      <input
        type="number"
        placeholder="Vidas"
        value={vidasVida}
        onChange={(e) => setVidasVida(e.target.value)}
      />
      <button onClick={() => {
        console.log("❤️Enviando Vida:", nomeVida, vidasVida);
        handleCadastrarVida(nomeVida, vidasVida);
      }}>
        Cadastrar Vida
      </button>

      <h3>💰 Cadastro de Banco</h3>
      <input
        type="text"
        placeholder="Nome do Jogador"
        value={nomeBanco}
        onChange={(e) => setNomeBanco(e.target.value)}
      />
      <input
        type="number"
        placeholder="Valor"
        value={valorBanco}
        onChange={(e) => setValorBanco(e.target.value)}
      />
      <button onClick={() => {
        console.log("💰Enviando Banco:", nomeBanco, valorBanco);
        handleCadastrarBanco(nomeBanco, valorBanco);
      }}>
        Cadastrar Banco
      </button>
    </aside>
  );
}

export default Aside;
