import { supabaseAdmin }
from "../supabaseAdmin.js";

const listaUsuarios = [
  {
    id: 1,
    nome: "Admin",
    usuario: "admin",
    senha: "123"
  }
];

class UsuarioModel {

  static async buscarPorUsuario(
    usuario
  ) {
    return listaUsuarios.find(
      u => u.usuario === usuario
    );
  }

  static async criarUsuario(
    email,
    senha
  ) {

    const { data, error } =
      await supabaseAdmin
      .auth
      .admin
      .createUser({
        email,
        password: senha,
        email_confirm: true,
      });

    if (error) {
      throw error;
    }

    return data.user;
  }

}
export default UsuarioModel;

//const listaUsuarios = [
//  { id: 1, nome: "Admin", usuario: "admin", senha: "123" }
//];

//class UsuarioModel {
//  static async buscarPorUsuario(usuario) {
//    return listaUsuarios.find(u => u.usuario === usuario);
//  }
//}

//export default UsuarioModel;