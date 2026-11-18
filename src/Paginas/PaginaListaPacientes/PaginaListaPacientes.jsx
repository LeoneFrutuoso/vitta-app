import { useState } from "react";
import Principal from "../../Componentes/Principal/Principal";
import { buscarPacientes } from "../../Servicos/PacientesServico";
import "./PaginaListaPacientes.css";
import { MdOutlineEmail } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { salvarNoLocalStorage } from "../../Servicos/LocalStorageServico";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CampoCustomizado from "../../Componentes/CampoCustomizado/CampoCustomizado";

function PaginaListaPacientes() {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState(buscarPacientes());
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const excluirPaciente = (pacienteParaExcluir) => {
    if (confirm(`Deseja excluir o paciente: ${pacienteParaExcluir.nome}?`)) {
      const pacientesAtualizados = pacientes.filter(
        (item) => item.id !== pacienteParaExcluir.id,
      );
      setPacientes(pacientesAtualizados);
      salvarNoLocalStorage("pacientes", pacientesAtualizados);
      toast.success("Paciente excluído com sucesso!");
    }
  };

  const editarPaciente = (pacienteParaEditar) => {
    navigate("/cadastro-paciente/" + pacienteParaEditar.id);
  };

  const pacientesFiltrados = pacientes.filter((item) => {
    return item.nome.toLowerCase().includes(termoPesquisa.toLowerCase());
  });

  return (
    <Principal titulo="Lista de Pacientes" voltarPara="/">
      <CampoCustomizado
        type="search"
        label="Pesquisar"
        placeholder="Digite o nome do paciente"
        value={termoPesquisa}
        onChange={(e) => setTermoPesquisa(e.target.value)}
      />

      {pacientesFiltrados.map((item, index) => {
        return (
          <div key={index} className="PaginaListaPacientes_item">
            <div>
              <h3>{item.nome}</h3>
              <span className="PaginaListaPacientes_item_email">
                <MdOutlineEmail />
                {item.email}
              </span>
            </div>

            <div className="PaginaListaPacientes_item_acoes">
              <MdEdit size={24} onClick={() => editarPaciente(item)} />
              <MdDelete
                size={24}
                color="red"
                onClick={() => excluirPaciente(item)}
              />
            </div>
          </div>
        );
      })}

      <div className="PaginaListaPacientes_botaoAdicionar">
        <MdAdd onClick={() => navigate("/cadastro-paciente")} />
      </div>
    </Principal>
  );
}

export default PaginaListaPacientes;