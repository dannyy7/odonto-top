const API = "http://localhost:3001";

export const api = {
  login: (dados) =>
    fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(dados)
    }),
};