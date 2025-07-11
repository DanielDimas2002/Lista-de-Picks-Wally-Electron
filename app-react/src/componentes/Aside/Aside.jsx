// Aside/Aside.jsx
import React from "react";
import styles from "./Aside.module.css";

function Aside({ handleCadastrarPick, handleCadastrarVida, handleCadastrarBanco }) {
  return (
    <aside className={styles.aside}>
      <h3>📋 Cadastro de Picks</h3>
      <input type="text" placeholder="Nome do Campeão" id="nomePick" />
      <input type="number" placeholder="Vidas" id="vidasPick" />
      <button onClick={() => {
        const nome = document.getElementById("nomePick").value;
        const vidas = document.getElementById("vidasPick").value;
        console.log("📋Enviando Pick:", nome, vidas)
        handleCadastrarPick(document.getElementById("nomePick").value, document.getElementById("vidasPick").value)
      }}>Cadastrar Pick</button>

      <h3>❤️ Cadastro de Vidas</h3>
      <input type="text" placeholder="Nome do Jogador" id="nomeVida" />
      <input type="number" placeholder="Vidas" id="vidasVida" />
      <button onClick={() => {
        const nome = document.getElementById("nomeVida").value;
        const vida = document.getElementById("vidasVida").value;
        console.log("❤️Enviando Vida:", nome, vida);
        handleCadastrarVida(document.getElementById("nomeVida").value, document.getElementById("vidasVida").value)
      }}>
        Cadastrar Vida
      </button>

      <h3>💰 Cadastro de Banco</h3>
      <input type="text" placeholder="Nome do Jogador" id="nomeBanco" />
      <input type="number" placeholder="Valor" id="valorBanco" />
      <button onClick={() => {
        const nome = document.getElementById("nomeBanco").value;
        const valor = document.getElementById("valorBanco").value;
        console.log("💰Enviando Banco:", nome, valor);
        handleCadastrarBanco(document.getElementById("nomeBanco").value, document.getElementById("valorBanco").value)
      }}>
        Cadastrar Banco
      </button>
    </aside>
  );
}

export default Aside;
