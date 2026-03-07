// src/componentes/Aside/Aside.jsx
import React, { useState, useRef } from "react";
import styles from "./Aside.module.css";
import { useTema } from "../../contexto/TemaContext";

function Aside({ handleCadastrarPick, handleCadastrarVida, handleCadastrarBanco }) {

  const { temaAtual } = useTema();

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

  const [corPick, setCorPick] = useState("botaoPadrao");
  const [corVida, setCorVida] = useState("botaoPadrao");
  const [corBanco, setCorBanco] = useState("botaoPadrao");

  // 🔁 Refs para armazenar os timers ativos
  const timerPick = useRef(null);
  const timerVida = useRef(null);
  const timerBanco = useRef(null);

  function campoVazio(...valores) {
    return valores.some(v => v === "" || v === null || v === undefined);
  }

  function resetarBotao(setTexto, setCor, textoOriginal, timerRef) {
    if (timerRef.current) {
      clearTimeout(timerRef.current); // cancela o anterior
    }
    timerRef.current = setTimeout(() => {
      setTexto(textoOriginal);
      setCor("botaoPadrao");
      timerRef.current = null; // limpa o ref
    }, 1500);
  }

  return (
    <aside className={styles.aside}
      style={{
        backgroundColor: temaAtual.fundoAside,
        color: temaAtual.corTextoPrincipal,
        borderLeft: `1px solid ${temaAtual.bordaAside}`
      }}>
      <h3>📋 Cadastro de Picks</h3>
      <input
        type="text"
        placeholder="Nome do Campeão"
        value={nomePick}
        onChange={(e) => setNomePick(e.target.value)}
        style={{
          backgroundColor: temaAtual.fundoInput,
          color: temaAtual.corTextoPrincipal,
          border: `1px solid ${temaAtual.bordaInput}`
        }}
      />
      <input
        type="number"
        placeholder="Vidas"
        value={vidasPick}
        onChange={(e) => setVidasPick(e.target.value)}
        style={{
          backgroundColor: temaAtual.fundoInput,
          color: temaAtual.corTextoPrincipal,
          border: `1px solid ${temaAtual.bordaInput}`
        }}
      />
      <button
        className={`${styles.botao} ${corPick ? styles[corPick] : ""}`}
        onClick={() => {
          if (campoVazio(nomePick, vidasPick) || parseInt(vidasPick) < 1) {
            setBotaoPick("Preencha corretamente!");
            setCorPick("botaoErro");
            resetarBotao(setBotaoPick, setCorPick, "Cadastrar Pick", timerPick);
            return;
          }
          handleCadastrarPick(nomePick, vidasPick);
          setBotaoPick("Cadastrado!");
          setCorPick("botaoSucesso");
          setNomePick("");
          setVidasPick("");
          resetarBotao(setBotaoPick, setCorPick, "Cadastrar Pick", timerPick);
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
        style={{
          backgroundColor: temaAtual.fundoInput,
          color: temaAtual.corTextoPrincipal,
          border: `1px solid ${temaAtual.bordaInput}`
        }}
      />
      <input
        type="number"
        placeholder="Vidas"
        value={vidasVida}
        onChange={(e) => setVidasVida(e.target.value)}
        style={{
          backgroundColor: temaAtual.fundoInput,
          color: temaAtual.corTextoPrincipal,
          border: `1px solid ${temaAtual.bordaInput}`
        }}
      />
      <button
        className={`${styles.botao} ${corVida ? styles[corVida] : ""}`}
        onClick={() => {
          if (campoVazio(nomeVida, vidasVida) || parseInt(vidasVida) < 1) {
            setBotaoVida("Preencha corretamente!");
            setCorVida("botaoErro");
            resetarBotao(setBotaoVida, setCorVida, "Cadastrar Vida", timerVida);
            return;
          }
          handleCadastrarVida(nomeVida, vidasVida);
          setBotaoVida("Cadastrado!");
          setCorVida("botaoSucesso");
          setNomeVida("");
          setVidasVida("");
          resetarBotao(setBotaoVida, setCorVida, "Cadastrar Vida", timerVida);
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
        style={{
          backgroundColor: temaAtual.fundoInput,
          color: temaAtual.corTextoPrincipal,
          border: `1px solid ${temaAtual.bordaInput}`
        }}
      />
      <input
        type="number"
        placeholder="Valor"
        value={valorBanco}
        onChange={(e) => setValorBanco(e.target.value)}
        style={{
          backgroundColor: temaAtual.fundoInput,
          color: temaAtual.corTextoPrincipal,
          border: `1px solid ${temaAtual.bordaInput}`
        }}
      />
      <button
        className={`${styles.botao} ${corBanco ? styles[corBanco] : ""}`}
        onClick={() => {
          if (campoVazio(nomeBanco, valorBanco) || parseInt(valorBanco) < 1) {
            setBotaoBanco("Preencha corretamente!");
            setCorBanco("botaoErro");
            resetarBotao(setBotaoBanco, setCorBanco, "Cadastrar Banco", timerBanco);
            return;
          }
          handleCadastrarBanco(nomeBanco, valorBanco);
          setBotaoBanco("Cadastrado!");
          setCorBanco("botaoSucesso");
          setNomeBanco("");
          setValorBanco("");
          resetarBotao(setBotaoBanco, setCorBanco, "Cadastrar Banco", timerBanco);
        }}
      >
        {botaoBanco}
      </button>
    </aside>
  );
}

export default Aside;
