import { useState } from "react";
import BotaoCustomizado from "../../Componentes/BotaoCustomizado/BotaoCustomizado";
import Principal from "../../Componentes/Principal/Principal";
import CampoCustomizado from "../../Componentes/CampoCustomizado/CampoCustomizado";
import { FaTrash } from "react-icons/fa6";
import "./PaginaCadastroConsulta.css";
import {
  buscarNoLocalStorage,
  salvarNoLocalStorage,
} from "../../Servicos/LocalStorageServico";
import { toast } from "react-toastify";

function PaginaCadastroConsulta() {
  const [descricaoConsulta, setDescricaoConsulta] = useState("");
  const [consultas, setConsultas] = useState(
    buscarNoLocalStorage("consultas") || []
  );

  const adicionarConsulta = () => {
    if (descricaoConsulta.trim()) {
      const novaConsulta = { id: Date.now(), descricao: descricaoConsulta };
      const consultasAtualizadas = [...consultas, novaConsulta];
      setConsultas(consultasAtualizadas);
      setDescricaoConsulta("");
      salvarNoLocalStorage("consultas", consultasAtualizadas);
      toast.success("Consulta cadastrada com sucesso!");
    } else {
      toast.error("Preencha o campo Consulta!");
    }
  };

  const removerConsulta = (id) => {
    if (confirm("Deseja realmente remover a consulta?")) {
      const consultasAtualizadas = consultas.filter((item) => item.id !== id);
      setConsultas(consultasAtualizadas);
      salvarNoLocalStorage("consultas", consultasAtualizadas);
      toast.success("Consulta removida com sucesso!");
    }
  };

  return (
    <Principal titulo="Cadastro de Consultas" voltarPara="/">
      <CampoCustomizado
        label="Descrição da Consulta"
        type="text"
        placeholder="Digite os detalhes da consulta"
        value={descricaoConsulta}
        onChange={(e) => setDescricaoConsulta(e.target.value)}
      />

      <BotaoCustomizado tipo="primario" aoClicar={adicionarConsulta}>
        Cadastrar Consulta
      </BotaoCustomizado>

      {consultas.map((item) => {
        return (
          <div key={item.id} className="PaginaCadastroConsulta_item">
            <span>{item.descricao}</span>
            <FaTrash
              color="red"
              cursor="pointer"
              onClick={() => removerConsulta(item.id)}
            />
          </div>
        );
      })}

      {!consultas.length && (
        <span className="PaginaCadastroConsulta_vazia">
          Nenhuma consulta cadastrada.
        </span>
      )}
    </Principal>
  );
}

export default PaginaCadastroConsulta;