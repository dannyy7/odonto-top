import { supabaseAdmin } from "../supabaseAdmin.js";
import DocumentoModel from "../models/documento.model.js";

export const fazerUploadDocumento = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ erro: "Nenhum arquivo enviado." });
    }

    const { originalname, mimetype, buffer } = req.file;

    const novoDocumento = await DocumentoModel.criarDocumento(
      originalname,
      mimetype,
      buffer
    );

    res.status(201).json({
      mensagem: "Documento salvo com sucesso no Supabase!",
      documento: novoDocumento
    });
  } catch (error) {
    console.error("Erro ao salvar documento:", error);
    res.status(500).json({ erro: "Erro interno ao salvar o documento." });
  }
};

export const listarTodosDocumentos = async (req, res) => {
  try {
    const documentos = await DocumentoModel.listarDocumentos();
    res.json(documentos);
  } catch (error) {
    console.error("Erro ao listar documentos:", error);
    res.status(500).json({ erro: "Erro ao listar documentos." });
  }
};

export const buscarDocumentoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🔍 A procurar o documento com ID: ${id}`);
    
    const { data, error } = await supabaseAdmin
      .from("documento")
      .select("*")
      .eq("idDocumento", id)
      .single();

    if (error || !data) {
      console.error("❌ Erro ou documento não encontrado:", error);
      return res.status(404).json({ erro: "Documento não encontrado." });
    }

    let arquivoBuffer = data.arquivo;

    // Se vier em formato string hexadecimal do Supabase
    if (typeof arquivoBuffer === "string" && arquivoBuffer.startsWith("\\x")) {
      arquivoBuffer = Buffer.from(arquivoBuffer.slice(2), "hex");
    }

    // Se o conteúdo descodificado for um JSON de Buffer do tipo {"type":"Buffer","data":[...]}
    if (Buffer.isBuffer(arquivoBuffer)) {
      const textoStr = arquivoBuffer.toString("utf8");
      if (textoStr.startsWith('{"type":"Buffer"')) {
        try {
          const jsonObj = JSON.parse(textoStr);
          if (jsonObj && jsonObj.data) {
            arquivoBuffer = Buffer.from(jsonObj.data);
          }
        } catch (e) {}
      }
    } else if (typeof arquivoBuffer === "string") {
      if (arquivoBuffer.startsWith('{"type":"Buffer"')) {
        try {
          const jsonObj = JSON.parse(arquivoBuffer);
          if (jsonObj && jsonObj.data) {
            arquivoBuffer = Buffer.from(jsonObj.data);
          }
        } catch (e) {}
      } else {
        arquivoBuffer = Buffer.from(arquivoBuffer, "base64");
      }
    }

    if (!Buffer.isBuffer(arquivoBuffer)) {
      arquivoBuffer = Buffer.from(arquivoBuffer);
    }

    console.log("📦 PDF convertido com sucesso. Tamanho final:", arquivoBuffer.length, "bytes");

    res.setHeader("Content-Type", data.tipoDocumento || "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${data.nomeArquivo || 'documento.pdf'}"`);
    
    return res.end(arquivoBuffer);
  } catch (error) {
    console.error("🔥 Erro crítico:", error);
    res.status(500).json({ erro: error.message });
  }
};