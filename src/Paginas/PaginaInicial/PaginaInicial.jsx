import BotaoCustomizado from "../../Componentes/BotaoCustomizado/BotaoCustomizado";
import Principal from "../../Componentes/Principal/Principal";
import { useNavigate } from "react-router-dom";

function PaginaInicial() {
  const navigate = useNavigate();

  return (
    <Principal titulo="Página Inicial">
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
    </Principal>
  );
}

export default PaginaInicial;