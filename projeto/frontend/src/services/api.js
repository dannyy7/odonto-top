const API = "http://localhost:3001";

async function request(url, options = {}) {
  const response = await fetch(`${API}${url}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`Erro ${response.status}`);
  }

  return response.json();
}

export const api = {

  login: (dados) =>
    fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(dados)
    }),

  listarTratamentos: (idPaciente) =>
    request(`/tratamentos/${idPaciente}`),

  criarTratamento: (dados) =>
    request("/tratamentos", {
      method: "POST",
      body: JSON.stringify(dados)
    }),

  editarTratamento: (id, dados) =>
    request(`/tratamentos/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados)
    }),

  excluirTratamento: (id) =>
    request(`/tratamentos/${id}`, {
      method: "DELETE"
    })

};