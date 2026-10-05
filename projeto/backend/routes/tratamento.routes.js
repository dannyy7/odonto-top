import express from "express";

import {
  listarTratamentos,
  criarTratamento,
  editarTratamento,
  excluirTratamento
}
from "../controllers/tratamento.controller.js";

const router = express.Router();

router.get(
  "/tratamentos/:idPaciente",
  listarTratamentos
);

router.post(
  "/tratamentos",
  criarTratamento
);

router.put(
  "/tratamentos/:id",
  editarTratamento
);

router.delete(
  "/tratamentos/:id",
  excluirTratamento
);

export default router;