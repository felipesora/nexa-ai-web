import type { UsuarioResponseDTO } from "../types/usuarioTypes";
import { getToken } from "./localStorageService";

const API_URL = import.meta.env.VITE_API_URL;

export async function buscarUsuarioPorId(idUsuario: number | null): Promise<UsuarioResponseDTO> {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    if (idUsuario == null) throw new Error("Id do usuário nulo.");

    const response = await fetch(
        `${API_URL}/v1/usuarios/${idUsuario}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        let mensagem = "Falha ao buscar usuário.";

        try {
            const erro: { message?: string } = await response.json();
            mensagem = erro.message || mensagem;
        } catch {
            // resposta sem corpo JSON: mantém a mensagem padrão
        }

        throw new Error(mensagem);
    }

    return response.json();
}
