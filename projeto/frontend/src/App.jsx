import Login from "./pages/Login";
import Home from "./pages/Home";
import Tarefas from "./pages/Tarefas";
import Usuarios from "./pages/Usuarios";
import Agenda from "./pages/Agenda";
import Documentos from "./pages/Documentos";
import Tratamentos from "./pages/Tratamentos";
import TratamentosPacientes from "./pages/TratamentosPacientes";

function App() {
  const rota = window.location.pathname;

  if (rota === "/home") return <Home />;

  if (rota === "/tarefas") return <Tarefas />;

  if (rota === "/usuarios") return <Usuarios />;

  if (rota === "/agenda") return <Agenda />;

  if (rota === "/modelos-documentos") return <Documentos />;

  // Tela que mostra a lista de pacientes
  if (rota === "/tratamentos") {
    return <TratamentosPacientes />;
  }

  // Tela de tratamentos de um paciente específico
  if (rota.startsWith("/tratamentos/")) {
    const idPaciente = rota.split("/")[2];

    return <Tratamentos idPaciente={idPaciente} />;
  }

  return <Login />;
}

export default App;