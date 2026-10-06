import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, "../frontend/.env")
});

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("SUPABASE URL:", supabaseUrl);
console.log(
  "SERVICE ROLE EXISTE:",
  !!supabaseServiceRoleKey
);
console.log(
  "SERVICE ROLE COMEÇA COM:",
  supabaseServiceRoleKey?.substring(0, 10)
);  

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceRoleKey
);