import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PaginaInicial from "./Paginas/PaginaInicial/PaginaInicial";
import PaginaListaConsultas from "./Paginas/PaginaListaConsultas/PaginaListaConsultas";
import PaginaListaPacientes from "./Paginas/PaginaListaPacientes/PaginaListaPacientes";
import PaginaCadastroPaciente from "./Paginas/PaginaCadastroPaciente/PaginaCadastroPaciente";
import PaginaCadastroConsulta from "./Paginas/PaginaCadastroConsulta/PaginaCadastroConsulta";

const roteador = createBrowserRouter([
  {
    path: "",
    element: <PaginaInicial />,
  },
  {
    path: "lista-consultas",
    element: <PaginaListaConsultas />,
  },
  {
    path: "lista-pacientes",
    element: <PaginaListaPacientes />,
  },
  {
    path: "cadastro-paciente/:id?",
    element: <PaginaCadastroPaciente />,
  },
  {
    path: "cadastro-consulta/:id?",
    element: <PaginaCadastroConsulta />,
  },
]);

function Roteador() {
  return <RouterProvider router={roteador} />;
}

export default Roteador;
