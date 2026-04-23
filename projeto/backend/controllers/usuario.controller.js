import UsuarioModel from "../models/usuario.model.js";

export const realizarLogin = async (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ erro: "Preencha os campos" });
  }

  const usuarioEncontrado = await UsuarioModel.buscarPorUsuario(usuario);

  if (!usuarioEncontrado || usuarioEncontrado.senha !== senha) {
    return res.status(401).json({ erro: "Credenciais inválidas" });
  }

  req.session.usuarioLogado = usuarioEncontrado;

  res.json({ nome: usuarioEncontrado.nome });
};

export const realizarLogout = (req, res) => {
  req.session.destroy();
  res.json({ mensagem: "Logout realizado" });
};

export const obterUsuarioLogado = (req, res) => {
  if (!req.session.usuarioLogado) {
    return res.status(401).json({ erro: "Não autorizado" });
  }

  res.json(req.session.usuarioLogado);
};