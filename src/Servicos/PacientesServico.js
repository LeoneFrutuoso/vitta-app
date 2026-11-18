import {
  buscarNoLocalStorage,
  salvarNoLocalStorage,
} from "./LocalStorageServico";

export const salvarPaciente = (paciente) => {
  const pacientes = buscarNoLocalStorage("pacientes") || [];
  if (!paciente.id) {
    paciente.id = Date.now();
    pacientes.push(paciente);
  } else {
    const index = pacientes.findIndex((p) => p.id === paciente.id);
    pacientes[index] = paciente;
  }

  salvarNoLocalStorage("pacientes", pacientes);
};

export const buscarPacientes = () => {
  return buscarNoLocalStorage("pacientes") || [];
};