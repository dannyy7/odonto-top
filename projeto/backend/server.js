import express from "express";
import session from "express-session";
import cors from "cors";

import usuarioRoutes from "./routes/usuario.routes.js";
import tarefaRoutes from "./routes/tarefa.routes.js";

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(session({
  secret: "segredo",
  resave: false,
  saveUninitialized: false
}));

app.use(usuarioRoutes);
app.use("/tarefas", tarefaRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});