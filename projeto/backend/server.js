import express from 'express'
import mysql from 'mysql2'

const app = express()

// ✅ CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.use(express.json())


// ✅ CONEXÃO MYSQL (RAILWAY)
const db = mysql.createConnection({
  host: 'caboose.proxy.rlwy.net',
  user: 'root',
  password: 'HOjpoIMBJSKhYphJkpeHSuQDRHgQHAuu',
  database: 'railway',
  port: 14956
})

db.connect((err) => {
  if (err) {
    console.error('❌ Erro ao conectar no MySQL:', err)
  } else {
    console.log('✅ Conectado ao MySQL (Railway)!')
  }
})

// ✅ TESTE
app.get('/', (req, res) => {
  res.send('🔥 SERVIDOR ONLINE COM RAILWAY 🔥')
})

app.get("/teste-banco", (req, res) => {
  db.query("SELECT * FROM pessoa", (err, result) => {
    if (err) {
      console.error(err)
      return res.json({ erro: err })
    }
    res.json(result)
  })
})

// ✅ LOGIN (CPF OU NOME)
app.post('/login', (req, res) => {
  const { usuario, senha } = req.body

  const sql = 'SELECT * FROM pessoa WHERE cpf = ? OR nome = ?'

  db.query(sql, [usuario, usuario], (err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: 'Erro no servidor' })
    }

    if (result.length === 0) {
      return res.json({ success: false, message: 'Usuário não encontrado' })
    }

    const user = result[0]

    if (user.senha !== senha) {
      return res.json({ success: false, message: 'Senha incorreta' })
    }

    res.json({ success: true, user })
  })
})

// ✅ PORTA
app.listen(3001, () => {
  console.log('🚀 Servidor rodando em http://localhost:3001')
})