const listaUsuarios = [
  { id: 1, nome: "Admin", usuario: "admin", senha: "123" }
];

class UsuarioModel {
  static async buscarPorUsuario(usuario) {
    return listaUsuarios.find(u => u.usuario === usuario);
  }
}

export default UsuarioModel;