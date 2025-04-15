

---

```markdown
# 🎮 Picks do Chat - Sistema de Gerenciamento para Lives

![Badge](https://img.shields.io/badge/status-em%20desenvolvimento-blue)  
Uma aplicação de desktop desenvolvida com **Electron**, criada especialmente para lives interativas no estilo "chat escolhe o personagem". Ideal para criadores de conteúdo como o **Wally**, que fazem transmissões de jogos como **League of Legends: Wild Rift** 🎥✨

---

## 📸 Demonstração

👉 Assista ao vídeo de demonstração no YouTube:  
[🔗 Clique aqui para assistir](https://youtu.be/2fDeawSibHE?si=kBO1FtG_vCUEzxnG)

---

## 🧩 Funcionalidades

✅ **Tabela de Picks**  
- Nome do personagem  
- Quantidade de vidas  
- Ações disponíveis:
  - ➖ Reduzir vida
  - ✏️ Editar nome ou vidas
  - 🔼 Subir / 🔽 Descer na lista
  - 🔝 Mover para o topo
  - 🗑️ Excluir pick

✅ **Vidas do Chat**  
- Nome do jogador  
- Quantidade de vidas  
- Ações:
  - ➖ Reduzir vida
  - ✏️ Editar
  - 🗑️ Excluir

✅ **Banco (Sistema de Créditos)**  
- Nome da pessoa  
- Valor do crédito (💰 em reais)  
- Edição direta na tabela  
- Validação automática e alerta se estiver vazio

✅ **Navegação fluida**  
- Menu lateral com botões para alternar entre as telas

✅ **Popup de Adição**
- Inserção de novos personagens, jogadores e créditos via pop-up

---

## 🛠️ Tecnologias utilizadas

- ⚙️ [Electron](https://www.electronjs.org/) - app desktop multiplataforma
- 🧠 JavaScript + HTML + CSS
- 🗃️ Armazenamento local em `dados.json`
- 🎨 Interface personalizada com tema escuro e toques dourados/vermelhos

---

## 💾 Como executar

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/nome-do-repositorio.git

# Acesse a pasta
cd nome-do-repositorio

# Instale as dependências
npm install

# Rode o app localmente
npm start
```

---

## 🖥️ Build para produção

```bash
# Build para todas as plataformas (Windows, Mac e Linux)
npm run dist

# Ou para plataforma específica:
npm run dist:win   # Windows
npm run dist:mac   # macOS
npm run dist:linux # Linux
```

O instalador será gerado na pasta `dist/`.

---

## 🙌 Créditos

Desenvolvido com 💙 por [Seu Nome ou Apelido]  
Projeto idealizado para auxiliar nas lives de **Wally** com participação ativa do chat!

---

## 📌 Observações

- O projeto é local, sem necessidade de internet ou login
- Os dados são salvos automaticamente
- Ideal para lives dinâmicas e organização ágil

---

## 🧠 Ideias Futuras

- 📈 Estatísticas dos picks mais usados
- 🔄 Importação/exportação de dados
- 🎭 Temas personalizados para diferentes jogos
- 🧑‍🤝‍🧑 Multiusuário (mais de um streamer usando simultaneamente)

---

## 🐞 Contribuições e feedback

Sugestões, melhorias e bugs são muito bem-vindos!  
Abra uma issue ou envie um pull request! 🙌



```
