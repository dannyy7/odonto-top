import { supabaseAdmin } from "../supabaseAdmin.js";

class DocumentoModel {
  static async criarDocumento(nomeArquivo, tipoDocumento, bufferArquivo) {
    try {
      // Como o campo no Supabase do tipo bytea armazena binário, convertemos para base64 ou inserimos buffer direto se suportado
      // O Supabase JS aceita buffers diretamente no insert se a coluna for bytea ou text.
      const { data, error } = await supabaseAdmin
        .from("documento")
        .insert([
          {
            nomeArquivo,
            tipoDocumento,
            arquivo: bufferArquivo,
          },
        ])
        .select();

      if (error) {
        throw error;
      }

      return data[0];
    } catch (error) {
      throw error;
    }
  }

  static async listarDocumentos() {
    const { data, error } = await supabaseAdmin
      .from("documento")
      .select("*")
      .order("idDocumento", { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  }
}

export default DocumentoModel;