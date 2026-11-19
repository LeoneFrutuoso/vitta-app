/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import BotaoCustomizado from "../../Componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../Componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../Componentes/Principal/Principal";
import { toast } from "react-toastify";
import { buscarConsultas, salvarConsulta } from "../../Servicos/ConsultasServico";
import { buscarPacientes } from "../../Servicos/PacientesServico";
import { useNavigate, useParams } from "react-router-dom";

function PaginaCadastroConsulta() {
  const navigate = useNavigate();
  const pacientes = buscarPacientes() || [];
  const [formConsulta, setFormConsulta] = useState({
    id: "",
    pacienteId: "",
    pacienteNome: "",
    data: "",
    horario: "",
    especialidade: "",
    observacoes: "",
  });

  const params = useParams();
  useEffect(() => {
    if (params.id) {
      const consultaParaEditar = buscarConsultas().find(
        (item) => item.id === +params.id,
      );
      if (consultaParaEditar) {
        setFormConsulta(consultaParaEditar);
      }
    }
  }, [params.id]);

  const salvar = () => {
    if (
      !formConsulta.pacienteNome.trim() ||
      !formConsulta.data.trim() ||
      !formConsulta.horario.trim()
    ) {
      toast.error("Os campos paciente, data e horário são obrigatórios!");
      return;
    }

    salvarConsulta(formConsulta);
    toast.success("Consulta salva com sucesso!");
    navigate("/lista-consultas");
  };

  const titulo = formConsulta.id ? "Editar Consulta" : "Nova Consulta";

  return (
    <Principal titulo={titulo} voltarPara="/">
      <CampoCustomizado
        label="Paciente"
        value={formConsulta.pacienteNome}
        onChange={(e) => {
          const selecionado = pacientes.find((p) => p.nome === e.target.value);
          setFormConsulta({
            ...formConsulta,
            pacienteNome: e.target.value,
            pacienteId: selecionado ? selecionado.id : "",
          });
        }}
        maxLength={50}
      />
      <CampoCustomizado
        label="Data"
        type="date"
        value={formConsulta.data}
        onChange={(e) =>
          setFormConsulta({ ...formConsulta, data: e.target.value })
        }
      />
      <CampoCustomizado
        label="Horário"
        type="time"
        value={formConsulta.horario}
        onChange={(e) =>
          setFormConsulta({ ...formConsulta, horario: e.target.value })
        }
      />
      <CampoCustomizado
        label="Especialidade"
        value={formConsulta.especialidade}
        onChange={(e) =>
          setFormConsulta({ ...formConsulta, especialidade: e.target.value })
        }
        maxLength={50}
      />
      <CampoCustomizado
        label="Observações"
        value={formConsulta.observacoes}
        onChange={(e) =>
          setFormConsulta({ ...formConsulta, observacoes: e.target.value })
        }
        maxLength={120}
      />

      <BotaoCustomizado tipo="primario" aoClicar={salvar}>
        Salvar
      </BotaoCustomizado>
    </Principal>
  );
}

export default PaginaCadastroConsulta;