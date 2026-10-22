import type { Pagina } from "../types/paginacaoType";
import type { CorWorkspace, IconeWorkspace, WorkspaceRequestDTO, WorkspaceResponseDTO } from "../types/workspaceTypes";
import { getToken } from "./localStorageService";

const API_URL = import.meta.env.VITE_API_URL;

export async function listarWorkspacesPorUsuario(idUsuario: number | null, pageSize = 10, pageNumber = 0): Promise<Pagina<WorkspaceResponseDTO>> {
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

export async function listarTodosIconesWorkspace(pageSize = 20, pageNumber = 0): Promise<Pagina<IconeWorkspace>> {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    const params = new URLSearchParams({
        page: String(pageNumber),
        size: String(pageSize),
    });

    const response = await fetch(
        `${API_URL}/task-service/v1/icones-workspace?${params}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        let mensagem = "Falha ao listar icones do workspace.";

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

export async function listarTodasCoresWorkspace(pageSize = 20, pageNumber = 0): Promise<Pagina<CorWorkspace>> {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    const params = new URLSearchParams({
        page: String(pageNumber),
        size: String(pageSize),
    });

    const response = await fetch(
        `${API_URL}/task-service/v1/cores-workspace?${params}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        let mensagem = "Falha ao listar cores do workspace.";

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

export async function buscarWorkspacePorId(idWorkspace: number | null): Promise<WorkspaceResponseDTO> {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    if (idWorkspace == null) throw new Error("Id do workspace nulo.");

    const response = await fetch(
        `${API_URL}/task-service/v1/workspaces/${idWorkspace}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        let mensagem = "Falha ao buscar workspace.";

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

export async function cadastrarWorkspace(workspaceDTO: WorkspaceRequestDTO) {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    const response = await fetch(
        `${API_URL}/task-service/v1/workspaces`, {
        method: "POST",
        headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(workspaceDTO)
    });

    if (!response.ok) {
        let mensagem = "Falha ao cadastrar workspace.";

        try {
            const erro: { message?: string } = await response.json();
            mensagem = erro.message || mensagem;
        } catch {
            // resposta sem corpo JSON: mantém a mensagem padrão
        }

        throw new Error(mensagem);
    }
}

export async function atualizarWorkspace(idWorkspace: number | null, workspaceDTO: WorkspaceRequestDTO) {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    if (idWorkspace == null) throw new Error("Id do workspace nulo.");

    const response = await fetch(
        `${API_URL}/task-service/v1/workspaces/${idWorkspace}`, {
        method: "PUT",
        headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(workspaceDTO)
    });

    if (!response.ok) {
        let mensagem = "Falha ao atualizar workspace.";

        try {
            const erro: { message?: string } = await response.json();
            mensagem = erro.message || mensagem;
        } catch {
            // resposta sem corpo JSON: mantém a mensagem padrão
        }

        throw new Error(mensagem);
    }
}

export async function deletarWorkspace(idWorkspace: number | null) {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    if (idWorkspace == null) throw new Error("Id do workspace nulo.");

    const response = await fetch(
        `${API_URL}/task-service/v1/workspaces/${idWorkspace}`, {
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
        let mensagem = "Falha ao deletar workspace.";

        try {
            const erro: { message?: string } = await response.json();
            mensagem = erro.message || mensagem;
        } catch {
            // resposta sem corpo JSON: mantém a mensagem padrão
        }

        throw new Error(mensagem);
    }
}