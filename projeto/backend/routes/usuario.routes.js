import express from "express";
import {
  realizarLogin,
  realizarLogout,
  obterUsuarioLogado,
  criarUsuario
} from "../controllers/usuario.controller.js";

const router = express.Router();

router.post("/login", realizarLogin);
router.post("/logout", realizarLogout);
router.get("/usuario", obterUsuarioLogado);
router.post("/criar-usuario", criarUsuario);

export default router;