import "./Rodape.css";

function Rodape() {
  const anoAtual = new Date().getFullYear();
  return (
    <footer className="Rodape_root">
      <span>Copyright © {anoAtual} - Vitta App. Todos os direitos reservados.</span>
    </footer>
  );
}

export default Rodape;





