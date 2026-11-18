import Principal from "../../Componentes/Principal/Principal";
import "./PaginaListaConsultas.css";

const consultas = [
  {
    paciente: "Ana Paula Silva",
    especialidade: "Cardiologia",
    valor: 250.0,
    status: ["#0284c7", "#38bdf8", "#bae6fd"],
  },
  {
    paciente: "Carlos Eduardo Souza",
    especialidade: "Ortopedia",
    valor: 320.5,
    status: ["#10b981", "#34d399", "#a7f3d0"],
  },
  {
    paciente: "Mariana Costa",
    especialidade: "Dermatologia",
    valor: 280.0,
    status: ["#f59e0b", "#fbbf24", "#fde68a"],
  },
];

function PaginaListaConsultas() {
  return (
    <Principal titulo="Lista de Consultas" voltarPara="/">
      {consultas.map((itemConsulta, index) => {
        return (
          <div key={index} className="PaginaListaConsultas_item">
            <h3>{itemConsulta.paciente}</h3>
            <strong>Especialidade:</strong> {itemConsulta.especialidade}
            <br />
            <strong>Valor:</strong>
            {itemConsulta.valor.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
            <br />
            <strong>Status:</strong>

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
          </div>
        );
      })}
    </Principal>
  );
}

export default PaginaListaConsultas;