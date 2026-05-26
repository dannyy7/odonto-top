# Guia de Configuração e Execução

Este documento descreve o passo a passo para configurar e executar o projeto odonto-top localmente.

## Sobre o Projeto

Este projeto utiliza:

- **Backend:** Node.js com Fastify
- **Frontend:** (adicione aqui o framework utilizado, ex: React, Vue, etc.)
- **Banco de Dados:** PostgreSQL
- **Serviço de Banco:** Supabase
- **Arquitetura:** MVC (Model-View-Controller)

---


# Pré-requisitos

Antes de começar, verifique se você possui instalado em sua máquina:

- Node.js (versão recomendada: 18+)
- npm
- PostgreSQL
- Supabase

---

# 1. Clonar o repositório

```bash
git clone <https://github.com/dannyy7/odonto-top>
```


# 2. Instalação de dependências

Acesse a pasta do projeto e instale/atualize o npm

```bash
cd projeto
npm install
```

## Frontend

Acesse a pasta do backend:

```bash
cd backend
```

Instale as dependências:
```bash
npm install fastify
npm install @supabase/supabase-js
npm instal dotenv
```

## Frontend

Acesse a pasta do frontend:

```bash
cd frontend
```


Instale a dependência:
```bash
npm install @supabase/supabase-js
```

# 3. Configuração do banco de dados

## Criar o banco de dados

Adicione as tabelas e populacione elas com os arquivos presentes na pasta "Scripts-BD" dentro da pasta de documentacao.

.env do backend 
SUPABASE_URL=https://vrpoqxpqwcefhmkejfah.supabase.co

SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZycG9xeHBxd2NlZmhta2VqZmFoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Nzg0MTU3NiwiZXhwIjoyMDkzNDE3NTc2fQ.rPGWfizRgCzGBj6wD9B0H6TLlVf0yxrZY0QT2ZIgWLg


# 4. Como executar o backend

Acesse a pasta do frontend:
```bash
cd frontend
```

Execute o servidor:
```bash
npm run dev
```

O site estará disponível em:
```
http://localhost:3000
```

