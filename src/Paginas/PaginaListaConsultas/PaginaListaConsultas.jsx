import { useState } from "react";
import Principal from "../../componentes/Principal/Principal";
import { buscarConsultas } from "../../servicos/ConsultasServico";
import "./PaginaListaConsultas.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";

import { salvarNoLocalStorage } from "../../servicos/LocalStorageServico";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";

function PaginaListaConsultas() {
  const navigate = useNavigate();
  const [consultas, setConsultas] = useState(buscarConsultas());
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const excluirConsulta = (consultaParaExcluir) => {
    if (
      confirm(
        `Deseja excluir a consulta de: ${consultaParaExcluir.paciente}?`,
      )
    ) {
      const consultasAtualizadas = consultas.filter(
        (item) => item.id !== consultaParaExcluir.id,
      );
      setConsultas(consultasAtualizadas);
      salvarNoLocalStorage("consultas", consultasAtualizadas);
      toast.success("Consulta excluída com sucesso!");
    }
  };

  const editarConsulta = (consultaParaEditar) => {
    navigate("/cadastro-consulta/" + consultaParaEditar.id);
  };

  const consultasFiltradas = consultas.filter((item) => {
    const paciente = (item.paciente || "").toLowerCase();
    const especialidade = (item.especialidade || "").toLowerCase();
    const busca = termoPesquisa.toLowerCase();

    return paciente.includes(busca) || especialidade.includes(busca);
  });

  return (
    <Principal titulo="Lista de Consultas" voltarPara="/">
      <CampoCustomizado
        type="search"
        label="Pesquisar"
        placeholder="Digite o nome do paciente ou especialidade"
        value={termoPesquisa}
        onChange={(e) => setTermoPesquisa(e.target.value)}
      />

      {consultasFiltradas.map((itemConsulta, index) => {
        return (
          <div key={index} className="PaginaListaConsultas_item">
            <div>
              <h3>{itemConsulta.paciente}</h3>
              <strong>Especialidade:</strong> {itemConsulta.especialidade}
              <br />
              <strong>Valor:</strong>{" "}
              {Number(itemConsulta.valor).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              <br />
              <strong>Status:</strong>

              {Array.isArray(itemConsulta.status) && (
                <div className="PaginaListaConsultas_status">
                  {itemConsulta.status.map((itemCor, indexCor) => {
                    return (
                      <div
                        key={indexCor}
                        className="PaginaListaConsultas_status-item"
                        style={{
                          backgroundColor: itemCor,
                        }}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            <div className="PaginaListaConsultas_item_acoes">
              <MdEdit size={24} onClick={() => editarConsulta(itemConsulta)} />
              <MdDelete
                size={24}
                color="red"
                onClick={() => excluirConsulta(itemConsulta)}
              />
            </div>
          </div>
        );
      })}

      <div className="PaginaListaConsultas_botaoAdicionar">
        <MdAdd onClick={() => navigate("/cadastro-consulta")} />
      </div>
    </Principal>
  );
}

export default PaginaListaConsultas;