import type { Pagina } from "../types/paginacaoType";
import type { Workspace } from "../types/workspaceTypes";
import { getToken } from "./localStorageService";

const API_URL = import.meta.env.VITE_API_URL;

export async function listarWorkspacesPorUsuario(idUsuario: number | null, pageSize = 10, pageNumber = 0): Promise<Pagina<Workspace>> {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    if (idUsuario == null) throw new Error("Id do usuário nulo.");

    const params = new URLSearchParams({
        page: String(pageNumber),
        size: String(pageSize),
    });

    const response = await fetch(
        `${API_URL}/task-service/v1/workspaces/usuario/${idUsuario}?${params}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        let mensagem = "Falha ao listar workspaces.";

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
