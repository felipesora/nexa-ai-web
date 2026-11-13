const TOKEN_KEY = "token";
const ID_USUARIO_KEY = "idUsuario";

export function salvarToken(token: string) {
   localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
   return localStorage.getItem(TOKEN_KEY);
}

export function salvarIdUsuario(idUsuario: string) {
   localStorage.setItem(ID_USUARIO_KEY, idUsuario);
}

export function getIdUsuario(): number | null {
   const id = localStorage.getItem(ID_USUARIO_KEY);
   return id ? Number(id) : null;
}

export function limparAutenticacao() {
   localStorage.removeItem(TOKEN_KEY);
   localStorage.removeItem(ID_USUARIO_KEY);
}