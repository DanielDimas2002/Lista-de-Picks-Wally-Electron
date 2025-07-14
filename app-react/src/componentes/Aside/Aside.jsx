import React, { useState } from "react";
import styles from "./Aside.module.css";

function Aside({ handleCadastrarPick, handleCadastrarVida, handleCadastrarBanco }) {
  // 🎯 Estados dos campos de input
  const [nomePick, setNomePick] = useState("");
  const [vidasPick, setVidasPick] = useState("");

  const [nomeVida, setNomeVida] = useState("");
  const [vidasVida, setVidasVida] = useState("");

  const [nomeBanco, setNomeBanco] = useState("");
  const [valorBanco, setValorBanco] = useState("");

  // ✅ Estados de feedback de sucesso
  const [sucessoPick, setSucessoPick] = useState(false);
  const [sucessoVida, setSucessoVida] = useState(false);
  const [sucessoBanco, setSucessoBanco] = useState(false);

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
        className={sucessoPick ? styles.botaoSucesso : styles.botaoPadrao}
        onClick={() => {
          handleCadastrarPick(nomePick, vidasPick);      // Envia para o App
          setNomePick("");                               // Limpa campos
          setVidasPick("");
          setSucessoPick(true);                          // Ativa feedback
          setTimeout(() => setSucessoPick(false), 2000); // Volta ao normal após 2s
        }}
      >
        {sucessoPick ? "✅ Cadastrado" : "Cadastrar Pick"}
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
        className={sucessoVida ? styles.botaoSucesso : styles.botaoPadrao}
        onClick={() => {
          handleCadastrarVida(nomeVida, vidasVida);
          setNomeVida("");
          setVidasVida("");
          setSucessoVida(true);
          setTimeout(() => setSucessoVida(false), 2000);
        }}
      >
        {sucessoVida ? "✅ Cadastrado" : "Cadastrar Vida"}
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
        className={sucessoBanco ? styles.botaoSucesso : styles.botaoPadrao}
        onClick={() => {
          handleCadastrarBanco(nomeBanco, valorBanco);
          setNomeBanco("");
          setValorBanco("");
          setSucessoBanco(true);
          setTimeout(() => setSucessoBanco(false), 2000);
        }}
      >
        {sucessoBanco ? "✅ Cadastrado" : "Cadastrar Banco"}
      </button>
    </aside>
  );
}

export default Aside;
