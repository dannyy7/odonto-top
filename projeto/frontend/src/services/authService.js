import { supabase } from "./supabaseCliente"

export async function loginComCPF(cpf, senha) {
    const { data: pessoa, error: erroPessoa } = await supabase
        .from('pessoa')
        .select('email')
        .eq('cpfPessoa', cpf)
        .single()

    if (erroPessoa || !pessoa) {
        console.log('CPF não encontrado')
        return null
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: pessoa.email,
        password: senha
    })

    if (error) {
        console.log('Erro no login:', error.message)
        return null
    }

    return data
}

export async function buscarPerfilLogado() {
    const { data: { user }, error: erroAuth } = await supabase.auth.getUser()

    if (erroAuth || !user) {
        console.log('Nenhum usuário autenticado')
        return null
    }

    console.log('Usuário autenticado:', user.email)

    const { data: pessoas, error } = await supabase
        .from('pessoa')
        .select('*')
        .limit(1)

    console.log('Exemplo de registro na tabela pessoa:', pessoas)
    console.log('Erro:', error)

    if (error || !pessoas || pessoas.length === 0) {
        console.log('Tabela pessoa vazia ou erro')
        return null
    }

    const { data: pessoa, error: erroPessoa } = await supabase
        .from('pessoa')
        .select('*')
        .eq('email', user.email)
        .single()

    console.log('Pessoa encontrada:', pessoa)
    console.log('Erro na busca:', erroPessoa)

    if (erroPessoa || !pessoa) {
        console.log('Perfil não encontrado na tabela pessoa')
        return null
    }

    return {
        nome: pessoa.nomePessoa,
        cpf: pessoa.cpfPessoa,
        email: pessoa.email,
        telefone: pessoa.telefonePessoa
    }
}