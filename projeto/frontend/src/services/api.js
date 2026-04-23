const API = "http://localhost:3000";

export const api = {
  login: (dados) =>
    fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(dados)
    }),

  usuario: () =>
    fetch(`${API}/usuario`, { credentials: "include" }),

  logout: () =>
    fetch(`${API}/logout`, {
      method: "POST",
      credentials: "include"
    }),

  tarefas: () =>
    fetch(`${API}/tarefas`, { credentials: "include" }),

  criar: (dados) =>
    fetch(`${API}/tarefas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(dados)
    }),

  excluir: (id) =>
    fetch(`${API}/tarefas/${id}`, {
      method: "DELETE",
      credentials: "include"
    })
};