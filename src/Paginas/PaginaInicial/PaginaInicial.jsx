import BotaoCustomizado from "../../Componentes/BotaoCustomizado/BotaoCustomizado";
import Principal from "../../Componentes/Principal/Principal";
import { useNavigate } from "react-router-dom";
import "./PaginaInicial.css";

function PaginaInicial() {
  const navigate = useNavigate();

  return (
    <Principal titulo="">
      <div className="PaginaInicial_container">
        <div className="PaginaInicial_topo">
          <h1 className="PaginaInicial_marca">Vitta App</h1>
          <h2 className="PaginaInicial_subtitulo">Página Inicial</h2>
        </div>

        <div className="PaginaInicial_gradeBotoes">
          <BotaoCustomizado
            tipo="primario"
            aoClicar={() => navigate("/lista-pacientes")}
          >
            Lista de Pacientes
          </BotaoCustomizado>

          <BotaoCustomizado
            tipo="secundario"
            aoClicar={() => navigate("/cadastro-paciente")}
          >
            Cadastro de Paciente
          </BotaoCustomizado>

          <BotaoCustomizado
            tipo="primario"
            aoClicar={() => navigate("/lista-consultas")}
          >
            Lista de Consultas
          </BotaoCustomizado>

          <BotaoCustomizado
            tipo="secundario"
            aoClicar={() => navigate("/cadastro-consulta")}
          >
            Cadastro de Consulta
          </BotaoCustomizado>
        </div>
      </div>
    </Principal>
  );
}

export default PaginaInicial;