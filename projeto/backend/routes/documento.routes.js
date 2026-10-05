import express from "express";
import multer from "multer";
import { 
  fazerUploadDocumento, 
  listarTodosDocumentos, 
  buscarDocumentoPorId 
} from "../controllers/documento.controller.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Rota para listar todos os documentos (Acessada em: GET /api/documentos)
router.get("/", listarTodosDocumentos);

// Rota para fazer upload (Acessada em: POST /api/documentos)
router.post("/", upload.single("arquivo"), fazerUploadDocumento);

// Rota para abrir o PDF pelo ID (Acessada em: GET /api/documentos/:id)
router.get("/:id", buscarDocumentoPorId);

export default router;