# Guia de Configuração e Execução

Este documento descreve o passo a passo para configurar e executar o projeto odonto-top localmente.

---

# Pré-requisitos

Antes de começar, verifique se você possui instalado em sua máquina:

- Node.js (versão recomendada: 18+)
- npm
- PostgreSQL
- Supabase
- Arquitetura MVC

---

# 1. Clonar o repositório

```bash
git clone <https://github.com/dannyy7/odonto-top>
```

Acesse a pasta do projeto:

```bash
cd projeto
```

# 2. Instalação de dependências

## Backend

Acesse a pasta do backend:

```bash
cd backend
```

Instale as dependências:
```bash
npm install
npm init -y
npm install fastify
npm install @supabase/supabase-js
```

## Frontend

Acesse a pasta do frontend:

```bash
cd frontend
```

# 3. Configuração do banco de dados

## Criar o banco de dados

# 4. Como executar o backend

Acesse a pasta do backend:
```bash
cd backend
```

Execute o servidor:
```bash
npm run dev
```

O backend estará disponível em:
```
http://localhost:3000
```

