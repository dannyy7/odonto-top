import express from 'express';
import usuarioRoutes from "./routes/usuario.routes.js";
import agendaRoutes from "./routes/agenda.routes.js";
import dotenv from "dotenv";
import tratamentoRoutes from "./routes/tratamento.routes.js";
import documentoRoutes from "./routes/documento.routes.js";
import { buscarDocumentoPorId } from "./controllers/documento.controller.js";

dotenv.config();

const app = express();

// ✅ CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.use(express.json());
import session from "express-session";

app.use(
  session({
    secret: "odonto-top-2026",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

app.use(usuarioRoutes);
app.use(agendaRoutes);
app.use(tratamentoRoutes);
app.use('/api/documentos', documentoRoutes);

// 🚀 Rota de teste direta com log
app.get('/api/documentos/:id', (req, res) => {
  console.log("--> Pedido recebido na rota de documentos com o ID:", req.params.id);
  try {
    return buscarDocumentoPorId(req, res);
  } catch (error) {
    console.error("Erro ao buscar documento:", error);
    res.status(500).send("Erro interno no servidor: " + error.message);
  }
});

app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

// 🚀 PORTA (ESSENCIAL PARA O SERVIDOR FICAR LIGADO!)
app.listen(3001, () => {
  console.log('🚀 Servidor rodando em http://localhost:3001');
});