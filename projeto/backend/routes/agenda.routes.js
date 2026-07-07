import express from "express";

import {
  listarConsultas
} from "../controllers/agenda.controller.js";

const router = express.Router();

router.get(
  "/consultas",
  listarConsultas
);

export default router;