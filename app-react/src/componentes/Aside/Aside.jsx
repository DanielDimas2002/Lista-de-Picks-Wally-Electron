// src/componentes/Aside/Aside.jsx
import React, { useState } from "react";
import styles from "./Aside.module.css";

function Aside({ handleCadastrarPick, handleCadastrarVida, handleCadastrarBanco }) {
  // 🎯 Estados dos inputs
  const [nomePick, setNomePick] = useState("");
  const [vidasPick, setVidasPick] = useState("");

  const [nomeVida, setNomeVida] = useState("");
  const [vidasVida, setVidasVida] = useState("");

  const [nomeBanco, setNomeBanco] = useState("");
  const [valorBanco, setValorBanco] = useState("");

  // ✅ Estados dos botões para feedback
  const [botaoPick, setBotaoPick] = useState("Cadastrar Pick");
  const [botaoVida, setBotaoVida] = useState("Cadastrar Vida");
  const [botaoBanco, setBotaoBanco] = useState("Cadastrar Banco");

  const [corPick, setCorPick] = useState("botaoPadrao");    // "", "verde", "vermelho"
  const [corVida, setCorVida] = useState("botaoPadrao");
  const [corBanco, setCorBanco] = useState("botaoPadrao");

  // 🧠 Função auxiliar para validação
  function campoVazio(...valores) {
    return valores.some(v => v === "" || v === null || v === undefined);
  }

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
      <button
        className={`${styles.botao} ${corPick ? styles[corPick] : ""}`}
        onClick={() => {
          if (campoVazio(nomePick, vidasPick) || parseInt(vidasPick) < 1) {
            setBotaoPick("Preencha corretamente!");
            setCorPick("botaoErro");
            return;
          }
          handleCadastrarPick(nomePick, vidasPick);
          setBotaoPick("Cadastrado!");
          setCorPick("botaoSucesso");
          setNomePick("");
          setVidasPick("");
          setTimeout(() => {
            setBotaoPick("Cadastrar Pick");
            setCorPick("botaoPadrao");
          }, 1500);
        }}
      >
        {botaoPick}
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
      <button
        className={`${styles.botao} ${corVida ? styles[corVida] : ""}`}
        onClick={() => {
          if (campoVazio(nomeVida, vidasVida) || parseInt(vidasVida) < 1) {
            setBotaoVida("Preencha corretamente!");
            setCorVida("botaoErro");
            return;
          }
          handleCadastrarVida(nomeVida, vidasVida);
          setBotaoVida("Cadastrado!");
          setCorVida("botaoSucesso");
          setNomeVida("");
          setVidasVida("");
          setTimeout(() => {
            setBotaoVida("Cadastrar Vida");
            setCorVida("botaoPadrao");
          }, 1500);
        }}
      >
        {botaoVida}
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
      <button
        className={`${styles.botao} ${corBanco ? styles[corBanco] : ""}`}
        onClick={() => {
          if (campoVazio(nomeBanco, valorBanco) || parseInt(valorBanco) < 1) {
            setBotaoBanco("Preencha corretamente!");
            setCorBanco("botaoErro");
            return;
          }
          handleCadastrarBanco(nomeBanco, valorBanco);
          setBotaoBanco("Cadastrado!");
          setCorBanco("botaoSucesso");
          setNomeBanco("");
          setValorBanco("");
          setTimeout(() => {
            setBotaoBanco("Cadastrar Banco");
            setCorBanco("botaoPadrao");
          }, 1500);
        }}
      >
        {botaoBanco}
      </button>
    </aside>
  );
}

export default Aside;
