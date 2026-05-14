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

