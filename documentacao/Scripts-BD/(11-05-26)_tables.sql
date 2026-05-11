-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.cargo (
  idCargo bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  nomeCargo character varying NOT NULL,
  CONSTRAINT cargo_pkey PRIMARY KEY (idCargo)
);
CREATE TABLE public.consulta (
  idConsulta bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  dataHora timestamp with time zone NOT NULL,
  tipo character varying NOT NULL,
  status character varying NOT NULL,
  observacoes character varying NOT NULL,
  idPacienteConsulta bigint NOT NULL,
  idPacienteFuncionario bigint NOT NULL,
  CONSTRAINT consulta_pkey PRIMARY KEY (idConsulta),
  CONSTRAINT consulta_idPacienteFuncionario_fkey FOREIGN KEY (idPacienteFuncionario) REFERENCES public.funcionario(idFuncionario),
  CONSTRAINT consulta_idPacienteConsulta_fkey FOREIGN KEY (idPacienteConsulta) REFERENCES public.paciente(idPaciente)
);
CREATE TABLE public.consultaProcedimento (
  idConsulProc bigint NOT NULL,
  idProcConsul bigint NOT NULL,
  CONSTRAINT consultaProcedimento_idConsulProc_fkey FOREIGN KEY (idConsulProc) REFERENCES public.consulta(idConsulta),
  CONSTRAINT consultaProcedimento_idProcConsul_fkey FOREIGN KEY (idProcConsul) REFERENCES public.procedimento(idProcedimento)
);
CREATE TABLE public.funcionario (
  idFuncionario bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  idPessoaFuncionario bigint NOT NULL,
  idCargoFuncionario bigint NOT NULL,
  CONSTRAINT funcionario_pkey PRIMARY KEY (idFuncionario),
  CONSTRAINT funcionario_idCargoFuncionario_fkey FOREIGN KEY (idCargoFuncionario) REFERENCES public.cargo(idCargo),
  CONSTRAINT funcionario_idPessoaFuncionario_fkey FOREIGN KEY (idPessoaFuncionario) REFERENCES public.pessoa(idPessoa)
);
CREATE TABLE public.paciente (
  idPaciente bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  idPessoaPaciente bigint NOT NULL,
  dataCadastro timestamp with time zone NOT NULL,
  planoDeSaude character varying,
  observacoes character varying,
  CONSTRAINT paciente_pkey PRIMARY KEY (idPaciente),
  CONSTRAINT paciente_idPessoaPaciente_fkey FOREIGN KEY (idPessoaPaciente) REFERENCES public.pessoa(idPessoa)
);
CREATE TABLE public.pagamento (
  idPagamento bigint NOT NULL,
  dataPagamento date NOT NULL,
  valor numeric NOT NULL,
  formaPagamento character varying NOT NULL,
  status character varying NOT NULL,
  idPagamentoConsulta bigint NOT NULL,
  CONSTRAINT pagamento_pkey PRIMARY KEY (idPagamento),
  CONSTRAINT pagamento_idPagamentoConsulta_fkey FOREIGN KEY (idPagamentoConsulta) REFERENCES public.consulta(idConsulta)
);
CREATE TABLE public.pessoa (
  idPessoa bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  cpfPessoa character varying NOT NULL UNIQUE,
  nomePessoa character varying NOT NULL,
  telefone character varying NOT NULL,
  email character varying NOT NULL,
  userId uuid NOT NULL DEFAULT gen_random_uuid(),
  endereco text,
  tipo text,
  CONSTRAINT pessoa_pkey PRIMARY KEY (idPessoa)
);
CREATE TABLE public.procedimento (
  idProcedimento bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  nomeProcedimento character varying NOT NULL,
  descricao character varying NOT NULL,
  valor numeric NOT NULL,
  CONSTRAINT procedimento_pkey PRIMARY KEY (idProcedimento)
);