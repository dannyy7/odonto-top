import express from "express";
import {
  realizarLogin,
  realizarLogout,
  obterUsuarioLogado,
  criarUsuario, 
  excluirUsuarioAuth,
} from "../controllers/usuario.controller.js";

const router = express.Router();

router.post("/login", realizarLogin);
router.post("/logout", realizarLogout);
router.get("/usuario", obterUsuarioLogado);
router.post("/criar-usuario", criarUsuario);
router.delete("/excluir-usuario/:userId", excluirUsuarioAuth);

export default router;