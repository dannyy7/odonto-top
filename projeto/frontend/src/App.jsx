//import Login from "./pages/Login"
//import Home from "./pages/Home"

//function App() {
  //const path = window.location.pathname

  //if (path === "/home") {
    //return <Home />
  //}

  //return <Login />
//}

//export default App


import Login from "./pages/Login";
import Home from "./pages/Home";
import Tarefas from "./pages/Tarefas";
import Usuarios from "./pages/Usuarios";
import Agenda from "./pages/Agenda";

function App() {
  const rota = window.location.pathname;

  if (rota === "/home") return <Home />;
  if (rota === "/tarefas") return <Tarefas />;
  if (rota === "/usuarios") return <Usuarios />;
  if (rota === "/agenda") return <Agenda />;

  return <Login />;
}

export default App;