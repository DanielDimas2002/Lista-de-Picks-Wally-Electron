function Toast({ mensagem, tipo }) {

  if (!mensagem) {
    return null;
  }

  return (
    <div className={`toast ${tipo}`}>
      {mensagem}
    </div>
  );
}

export default Toast;