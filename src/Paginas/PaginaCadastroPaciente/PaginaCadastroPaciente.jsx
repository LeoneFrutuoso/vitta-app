/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import BotaoCustomizado from "../../Componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../Componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../Componentes/Principal/Principal";
import {
  formatarComMascara,
  MASCARA_CPF,
  MASCARA_TELEFONE,
} from "../../Utils/formatarComMascara";
import { toast } from "react-toastify";
import validarCPF from "../../Utils/validarCPF";
import validarEmail from "../../Utils/validarEmail";
import { buscarPacientes, salvarPaciente } from "../../Servicos/PacientesServico";
import { useNavigate, useParams } from "react-router-dom";

function PaginaCadastroPaciente() {
  const navigate = useNavigate();
  const [formPaciente, setFormPaciente] = useState({
    id: "",
    nome: "",
    email: "",
    dataNascimento: "",
    telefone: "",
    cpf: "",
    foto: "",
  });

  const params = useParams();
  useEffect(() => {
    if (params.id) {
      const pacienteParaEditar = buscarPacientes().find(
        (item) => item.id === +params.id,
      );
      if (pacienteParaEditar) {
        setFormPaciente(pacienteParaEditar);
      }
    }
  }, [params.id]);

  const salvar = () => {
    if (!formPaciente.nome.trim() || !formPaciente.email.trim()) {
      toast.error("Os campos nome e email são obrigatórios!");
      return;
    }

    if (!validarEmail(formPaciente.email)) {
      toast.error("Email inválido!");
      return;
    }

    if (formPaciente.cpf.trim() && !validarCPF(formPaciente.cpf)) {
      toast.error("CPF inválido!");
      return;
    }

    salvarPaciente(formPaciente);
    toast.success("Paciente salvo com sucesso!");
    navigate("/lista-pacientes");
  };

  const titulo = formPaciente.id ? "Editar Paciente" : "Novo Paciente";

  return (
    <Principal titulo={titulo} voltarPara="/">
      <CampoCustomizado
        label="Nome"
        value={formPaciente.nome}
        onChange={(e) =>
          setFormPaciente({ ...formPaciente, nome: e.target.value })
        }
        maxLength={50}
      />
      <CampoCustomizado
        label="Email"
        value={formPaciente.email}
        onChange={(e) =>
          setFormPaciente({ ...formPaciente, email: e.target.value })
        }
        maxLength={50}
      />
      <CampoCustomizado
        label="Data Nascimento"
        type="date"
        value={formPaciente.dataNascimento}
        onChange={(e) =>
          setFormPaciente({ ...formPaciente, dataNascimento: e.target.value })
        }
      />
      <CampoCustomizado
        label="Telefone"
        type="tel"
        value={formPaciente.telefone}
        onChange={(e) =>
          setFormPaciente({
            ...formPaciente,
            telefone: formatarComMascara(e.target.value, MASCARA_TELEFONE),
          })
        }
      />
      <CampoCustomizado
        label="CPF"
        value={formPaciente.cpf}
        onChange={(e) =>
          setFormPaciente({
            ...formPaciente,
            cpf: formatarComMascara(e.target.value, MASCARA_CPF),
          })
        }
      />

      <CampoCustomizado
        type="file"
        accept="image/*"
        label="Foto"
        onChange={(e) => {
          const imagem = e.target.files[0];
          if (imagem) {
            const reader = new FileReader();
            reader.onload = (event) => {
              setFormPaciente({ ...formPaciente, foto: event.target.result });
            };
            reader.readAsDataURL(imagem);
          }
        }}
      />

      {formPaciente.foto && (
        <div>
          <img
            src={formPaciente.foto}
            alt="Foto do Paciente"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      )}

      <BotaoCustomizado tipo="primario" aoClicar={salvar}>
        Salvar
      </BotaoCustomizado>
    </Principal>
  );
}

export default PaginaCadastroPaciente;