import express from "express";
import {
  listarTarefas,
  criarTarefa,
  excluirTarefa
} from "../controllers/tarefa.controller.js";

const router = express.Router();

const verificarAuth = (req, res, next) => {
  if (!req.session.usuarioLogado) {
    return res.status(401).json({ erro: "Não autorizado" });
  }
  next();
};

router.get("/", verificarAuth, listarTarefas);
router.post("/", verificarAuth, criarTarefa);
router.delete("/:id", verificarAuth, excluirTarefa);

export default router;