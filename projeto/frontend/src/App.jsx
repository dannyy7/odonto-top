import Login from "./pages/Login";
import Home from "./pages/Home";
import Tarefas from "./pages/Tarefas";

function App() {
  const rota = window.location.pathname;

  if (rota === "/home") return <Home />;
  if (rota === "/tarefas") return <Tarefas />;

  return <Login />; // ESSA LINHA RESOLVE SUA TELA BRANCA
}

export default App;