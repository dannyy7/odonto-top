import 'dotenv/config'; // <-- Adicione esta linha no topo para carregar o .env
import fs from "fs";
import path from "path";
import { supabaseAdmin } from "./supabaseAdmin.js";

async function importar() {
  const pastaDosPdfs = "./pdfs";

  const arquivosParaImportar = [
    { arquivo: "ATESTADO ODONTOLÓGICO.pdf" },
    { arquivo: "RECEITA.pdf" },
    { arquivo: "ORÇAMENTO.pdf" },
    { arquivo: "TERMO DE CONSENTIMENTO.pdf" }
  ];

  for (const item of arquivosParaImportar) {
    try {
      const caminhoCompleto = path.join(pastaDosPdfs, item.arquivo);
      
      if (!fs.existsSync(caminhoCompleto)) {
        console.log(`❌ Arquivo não encontrado: ${caminhoCompleto}`);
        continue;
      }

      const buffer = fs.readFileSync(caminhoCompleto);

      const { error } = await supabaseAdmin
        .from("documento")
        .insert([
          {
            nomeArquivo: item.arquivo,
            tipoDocumento: "application/pdf",
            arquivo: buffer
          }
        ]);

      if (error) {
        console.error(`❌ Erro do Supabase em ${item.arquivo}:`, error.message);
      } else {
        console.log(`✅ Sucesso! Inserido no banco: ${item.arquivo}`);
      }
    } catch (err) {
      console.error(`❌ Erro ao ler ${item.arquivo}:`, err.message);
    }
  }
  process.exit();
}

importar();