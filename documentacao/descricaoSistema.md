# Descrição do Sistema

## 1. Visão Geral do Sistema

O sistema proposto consiste em uma aplicação web desenvolvida para auxiliar no gerenciamento e organização de uma clínica odontológica. O objetivo principal é facilitar o controle de informações relacionadas aos pacientes, consultas, atendimentos e demais processos administrativos realizados no ambiente odontológico.

A aplicação foi desenvolvida seguindo o padrão de arquitetura MVC (Model-View-Controller), promovendo maior organização do código, separação de responsabilidades e facilidade de manutenção.

O sistema possui:

- um backend responsável pelas regras de negócio e comunicação com o banco de dados;
- um frontend responsável pela interface gráfica e interação com os usuários;
- integração com banco de dados PostgreSQL utilizando Supabase.

---

# 2. Funcionalidades do Sistema

O sistema odontológico permite funcionalidades como:

- cadastro de pacientes;
- agendamento de consultas;
- gerenciamento de prontuários;
- controle de atendimentos;
- atualização de informações dos pacientes;
- visualização de histórico de consultas;
- gerenciamento de usuários do sistema;
- armazenamento organizado das informações clínicas.

O sistema busca reduzir o uso de processos manuais e melhorar a organização da clínica odontológica.

---

# 3. Funcionamento do Sistema

O funcionamento ocorre da seguinte forma:

1. O usuário acessa a aplicação web pelo navegador.
2. A interface desenvolvida em React permite interação com o sistema.
3. O frontend envia requisições para a API desenvolvida em Fastify.
4. O backend processa as regras de negócio.
5. As informações são armazenadas e consultadas no banco PostgreSQL hospedado no Supabase.
6. Os dados retornam ao frontend para exibição ao usuário.

A comunicação entre frontend e backend é realizada através de API REST utilizando JSON.

---

# 4. Arquitetura Utilizada

O sistema utiliza a arquitetura MVC:

## Model

Responsável pela comunicação com o banco de dados e manipulação das informações.

## View

Responsável pela interface gráfica do sistema utilizando React.

## Controller

Responsável pelo processamento das regras de negócio e intermediação entre frontend e banco de dados.

Essa divisão melhora a organização e manutenção do projeto.

---

# 5. Tecnologias Utilizadas

## Backend

- Node.js
- Fastify
- dotenv
- PostgreSQL
- Supabase

## Frontend

- React
- Vite
- Axios
- React Router DOM

## Banco de Dados

- PostgreSQL

## Controle de Versão

- Git
- GitHub

---

# 6. Justificativa das Escolhas

## Node.js

O Node.js foi escolhido por permitir o desenvolvimento do backend utilizando JavaScript, facilitando a integração com o frontend e proporcionando bom desempenho para aplicações web.

---

## Fastify

O Fastify foi utilizado devido à sua alta performance, baixo consumo de recursos e facilidade na criação de APIs REST organizadas e escaláveis.

---

## React

O React foi escolhido para construção da interface por oferecer:

- componentização;
- reutilização de código;
- atualização dinâmica da interface;
- melhor experiência para o usuário;
- facilidade de manutenção;

---

## PostgreSQL

O PostgreSQL foi escolhido por ser um banco de dados relacional robusto, seguro e eficiente para armazenamento das informações da clínica odontológica.

---

## Supabase

O Supabase foi utilizado por fornecer:

- hospedagem do banco PostgreSQL;
- gerenciamento simplificado do banco;
- integração rápida com aplicações web;
- ambiente moderno e escalável;

---

## Arquitetura MVC

A arquitetura MVC foi escolhida por melhorar:

- organização do projeto;
- separação de responsabilidades;
- manutenção do sistema;
- escalabilidade;
- desenvolvimento em equipe;

---

# 7. Objetivos do Sistema

O sistema possui como principais objetivos:

- facilitar o gerenciamento da clínica odontológica;
- organizar informações dos pacientes;
- agilizar processos administrativos;
- reduzir o uso de documentos físicos;
- melhorar o controle de consultas e atendimentos;
- proporcionar maior eficiência e organização;

---

# 8. Público-Alvo

O sistema é destinado para:

- clínicas odontológicas;
- dentistas;
- recepcionistas;
- administradores da clínica;

---

# 9. Considerações Finais

A combinação entre Fastify, React, PostgreSQL e Supabase permite o desenvolvimento de uma aplicação moderna, eficiente e organizada para gerenciamento odontológico.

Além disso, a utilização da arquitetura MVC contribui para uma estrutura mais limpa, facilitando futuras manutenções, melhorias e expansão do sistema.