import { useState } from "react";
import Principal from "../../Componentes/Principal/Principal";
import BotaoCustomizado from "../../Componentes/BotaoCustomizado/BotaoCustomizado";
import "./PaginaListaPacientes.css";

const pacientesIniciais = [
  {
    nome: "Ana Paula Silva",
    telefone: "(48) 99999-1111",
    email: "ana.silva@email.com",
    cpf: "111.222.333-44",
  },
  {
    nome: "Carlos Eduardo Souza",
    telefone: "(48) 99999-2222",
    email: "carlos.souza@email.com",
    cpf: "222.333.444-55",
  },
  {
    nome: "Mariana Costa",
    telefone: "(48) 99999-3333",
    email: "mariana.costa@email.com",
    cpf: "333.444.555-66",
  },
];

function PaginaListaPacientes() {
  const [pacientes, setPacientes] = useState(pacientesIniciais);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");

  function adicionarPaciente(evento) {
    evento.preventDefault();
    if (!nome.trim()) return;

    const novoPaciente = {
      nome,
      telefone,
      email,
      cpf,
    };

    setPacientes([...pacientes, novoPaciente]);
    setNome("");
    setTelefone("");
    setEmail("");
    setCpf("");
    setMostrarFormulario(false);
  }

  return (
    <Principal titulo="Lista de Pacientes" voltarPara="/">
      {pacientes.map((itemPaciente, index) => {
        return (
          <div key={index} className="PaginaListaPacientes_item">
            <h3>{itemPaciente.nome}</h3>
            <strong>Telefone:</strong> {itemPaciente.telefone}
            <br />
            <strong>Email:</strong> {itemPaciente.email}
            <br />
            <strong>CPF:</strong> {itemPaciente.cpf}
          </div>
        );
      })}

      {mostrarFormulario && (
        <form onSubmit={adicionarPaciente} className="PaginaListaPacientes_form">
          <input
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <BotaoCustomizado tipo="primario">Salvar</BotaoCustomizado>
        </form>
      )}

      <div className="PaginaListaPacientes_botaoAdicionar">
        <BotaoCustomizado
          tipo="primario"
          aoClicar={() => setMostrarFormulario(!mostrarFormulario)}
        >
          +
        </BotaoCustomizado>
      </div>
    </Principal>
  );
}

export default PaginaListaPacientes;