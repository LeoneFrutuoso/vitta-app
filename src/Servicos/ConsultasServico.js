import { buscarNoLocalStorage, salvarNoLocalStorage } from "./LocalStorageServico";

const CHAVE_CONSULTAS = "@vitta_app:consultas";

function buscarConsultas() {
  return buscarNoLocalStorage(CHAVE_CONSULTAS) || [];
}

function salvarConsulta(consulta) {
  const consultas = buscarConsultas();

  if (consulta.id) {
    const atualizadas = consultas.map((item) =>
      item.id === consulta.id ? consulta : item,
    );
    salvarNoLocalStorage(CHAVE_CONSULTAS, atualizadas);
  } else {
    const novaConsulta = {
      ...consulta,
      id: Date.now(),
    };
    salvarNoLocalStorage(CHAVE_CONSULTAS, [...consultas, novaConsulta]);
  }
}

function excluirConsulta(id) {
  const consultas = buscarConsultas().filter((item) => item.id !== id);
  salvarNoLocalStorage(CHAVE_CONSULTAS, consultas);
}

export { buscarConsultas, salvarConsulta, excluirConsulta };