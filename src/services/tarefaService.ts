import type { Pagina } from "../types/paginacaoType";
import type { SubtarefaResponseDTO } from "../types/subtarefaTypes";
import type { TarefaCreateDTO, TarefaResponseDTO, TarefaUpdateDTO } from "../types/tarefaTypes";
import { getToken } from "./localStorageService";

const API_URL = import.meta.env.VITE_API_URL;

export async function buscarTarefaPorId(idTarefa: number | null): Promise<TarefaResponseDTO> {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    if (idTarefa == null) throw new Error("Id da tarefa nulo.");

    const response = await fetch(
        `${API_URL}/task-service/v1/tarefas/${idTarefa}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        let mensagem = "Falha ao buscar tarefa.";

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

export async function cadastrarTarefa(tarefaDTO: TarefaCreateDTO) {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    const response = await fetch(
        `${API_URL}/task-service/v1/tarefas`, {
        method: "POST",
        headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(tarefaDTO)
    });

    if (!response.ok) {
        let mensagem = "Falha ao cadastrar tarefa.";

        try {
            const erro: { message?: string } = await response.json();
            mensagem = erro.message || mensagem;
        } catch {
            // resposta sem corpo JSON: mantém a mensagem padrão
        }

        throw new Error(mensagem);
    }
}

export async function atualizarTarefa(idTarefa: number | null, tarefaDTO: TarefaUpdateDTO) {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    if (idTarefa == null) throw new Error("Id da tarefa nulo.");

    const response = await fetch(
        `${API_URL}/task-service/v1/tarefas/${idTarefa}`, {
        method: "PUT",
        headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(tarefaDTO)
    });

    if (!response.ok) {
        let mensagem = "Falha ao atualizar tarefa.";

        try {
            const erro: { message?: string } = await response.json();
            mensagem = erro.message || mensagem;
        } catch {
            // resposta sem corpo JSON: mantém a mensagem padrão
        }

        throw new Error(mensagem);
    }
}

export async function deletarTarefa(idTarefa: number | null) {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    if (idTarefa == null) throw new Error("Id da tarefa nulo.");

    const response = await fetch(
        `${API_URL}/task-service/v1/tarefas/${idTarefa}`, {
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
        let mensagem = "Falha ao deletar tarefa.";

        try {
            const erro: { message?: string } = await response.json();
            mensagem = erro.message || mensagem;
        } catch {
            // resposta sem corpo JSON: mantém a mensagem padrão
        }

        throw new Error(mensagem);
    }
}

export async function concluirTarefa(idTarefa: number | null) {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    if (idTarefa == null) throw new Error("Id da tarefa nulo.");

    const response = await fetch(
        `${API_URL}/task-service/v1/tarefas/${idTarefa}/concluir`, {
        method: "PATCH",
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
        let mensagem = "Falha ao concluir tarefa.";

        try {
            const erro: { message?: string } = await response.json();
            mensagem = erro.message || mensagem;
        } catch {
            // resposta sem corpo JSON: mantém a mensagem padrão
        }

        throw new Error(mensagem);
    }
}

export async function iniciarTarefa(idTarefa: number | null) {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    if (idTarefa == null) throw new Error("Id da tarefa nulo.");

    const response = await fetch(
        `${API_URL}/task-service/v1/tarefas/${idTarefa}/iniciar`, {
        method: "PATCH",
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
        let mensagem = "Falha ao iniciar tarefa.";

        try {
            const erro: { message?: string } = await response.json();
            mensagem = erro.message || mensagem;
        } catch {
            // resposta sem corpo JSON: mantém a mensagem padrão
        }

        throw new Error(mensagem);
    }
}

export async function reabrirTarefa(idTarefa: number | null) {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    if (idTarefa == null) throw new Error("Id da tarefa nulo.");

    const response = await fetch(
        `${API_URL}/task-service/v1/tarefas/${idTarefa}/reabrir`, {
        method: "PATCH",
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
        let mensagem = "Falha ao reabrir tarefa.";

        try {
            const erro: { message?: string } = await response.json();
            mensagem = erro.message || mensagem;
        } catch {
            // resposta sem corpo JSON: mantém a mensagem padrão
        }

        throw new Error(mensagem);
    }
}

export async function listarSubtarefasPorIdTarefa(idTarefa: number | null, pageSize = 10, pageNumber = 0): Promise<Pagina<SubtarefaResponseDTO>> {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    if (idTarefa == null) throw new Error("Id do tarefa nulo.");

    const params = new URLSearchParams({
        page: String(pageNumber),
        size: String(pageSize),
    });

    const response = await fetch(
        `${API_URL}/task-service/v1/tarefas/${idTarefa}/subtarefas?${params}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        let mensagem = "Falha ao listar subtarefas.";

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