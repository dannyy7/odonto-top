import express from "express";
import {
  realizarLogin,
  realizarLogout,
  obterUsuarioLogado
} from "../controllers/usuario.controller.js";

const router = express.Router();

router.post("/login", realizarLogin);
router.post("/logout", realizarLogout);
router.get("/usuario", obterUsuarioLogado);

export default router;