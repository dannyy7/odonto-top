import { supabase } from "./supabaseCliente"

export async function loginComCPF(cpf, senha) {

    // 1. Buscar email pelo CPF
    const { data: pessoa, error: erroPessoa } = await supabase
        .from('pessoa')
        .select('email')
        .eq('cpfPessoa', cpf)
        .single()

    if (erroPessoa || !pessoa) {
        console.log('CPF não encontrado')
        return null
    }

    // 2. Fazer login com email + senha
    const { data, error } = await supabase.auth.signInWithPassword({
        email: pessoa.email,
        password: senha
    })

    if (!pessoa || !pessoa.email) {
    console.log('Usuário não encontrado no banco')
    return null
    }
    
    if (error) {
        console.log('Erro no login:', error.message)
        return null
    }

    return data
}