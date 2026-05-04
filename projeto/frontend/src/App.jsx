import Login from "./pages/Login";
import Home from "./pages/Home";
import Tarefas from "./pages/Tarefas";
import Usuarios from "./pages/Usuarios";

function App() {
  const rota = window.location.pathname;

  if (rota === "/home") return <Home />;
  if (rota === "/tarefas") return <Tarefas />;
  if (rota === "/usuarios") return <Usuarios />;

  return <Login />;
}

export default App;