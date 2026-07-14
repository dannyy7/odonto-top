import express from 'express';
import usuarioRoutes from "./routes/usuario.routes.js";
import agendaRoutes from "./routes/agenda.routes.js"
import dotenv from "dotenv";

dotenv.config();

const app = express()

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
      secure: false, // true somente quando usar HTTPS
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 // 24 horas
    }
  })
);

app.use(usuarioRoutes);
app.use(agendaRoutes)

app.get("/", (req, res) => {
  res.send("Backend funcionando");
});


// PORTA
app.listen(3001, () => {
  console.log('🚀 Servidor rodando em http://localhost:3001')
})