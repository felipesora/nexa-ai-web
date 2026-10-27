import type { Pagina } from "../types/paginacaoType";
import type { CorTag, TagRequestDTO, TagResponseDTO } from "../types/tagTypes";
import { getToken } from "./localStorageService";

const API_URL = import.meta.env.VITE_API_URL;

export async function listarTagsPorUsuario(idUsuario: number | null, pageSize = 10, pageNumber = 0): Promise<Pagina<TagResponseDTO>> {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    if (idUsuario == null) throw new Error("Id do usuário nulo.");

    const params = new URLSearchParams({
        page: String(pageNumber),
        size: String(pageSize),
    });

    const response = await fetch(
        `${API_URL}/task-service/v1/tags/usuario/${idUsuario}?${params}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        let mensagem = "Falha ao listar tags.";

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

export async function buscarTagPorId(idTag: number | null): Promise<TagResponseDTO> {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    if (idTag == null) throw new Error("Id da tag nulo.");

    const response = await fetch(
        `${API_URL}/task-service/v1/tags/${idTag}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        let mensagem = "Falha ao buscar tag.";

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

export async function cadastrarTag(tagDTO: TagRequestDTO) {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    const response = await fetch(
        `${API_URL}/task-service/v1/tags`, {
        method: "POST",
        headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(tagDTO)
    });

    if (!response.ok) {
        let mensagem = "Falha ao cadastrar tag.";

        try {
            const erro: { message?: string } = await response.json();
            mensagem = erro.message || mensagem;
        } catch {
            // resposta sem corpo JSON: mantém a mensagem padrão
        }

        throw new Error(mensagem);
    }
}

export async function atualizarTag(idTag: number | null, tagDTO: TagRequestDTO) {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    if (idTag == null) throw new Error("Id da tag nulo.");

    const response = await fetch(
        `${API_URL}/task-service/v1/tags/${idTag}`, {
        method: "PUT",
        headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(tagDTO)
    });

    if (!response.ok) {
        let mensagem = "Falha ao atualizar tag.";

        try {
            const erro: { message?: string } = await response.json();
            mensagem = erro.message || mensagem;
        } catch {
            // resposta sem corpo JSON: mantém a mensagem padrão
        }

        throw new Error(mensagem);
    }
}

export async function deletarTag(idTag: number | null) {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    if (idTag == null) throw new Error("Id da tag nulo.");

    const response = await fetch(
        `${API_URL}/task-service/v1/tags/${idTag}`, {
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
        let mensagem = "Falha ao deletar tag.";

        try {
            const erro: { message?: string } = await response.json();
            mensagem = erro.message || mensagem;
        } catch {
            // resposta sem corpo JSON: mantém a mensagem padrão
        }

        throw new Error(mensagem);
    }
}

export async function listarTodasCoresTag(pageSize = 20, pageNumber = 0): Promise<Pagina<CorTag>> {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    const params = new URLSearchParams({
        page: String(pageNumber),
        size: String(pageSize),
    });

    const response = await fetch(
        `${API_URL}/task-service/v1/cores-tag?${params}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        let mensagem = "Falha ao listar cores da tag.";

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
