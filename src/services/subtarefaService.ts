import type { SubtarefaCreateDTO, SubtarefaResponseDTO, SubtarefaUpdateDTO } from "../types/subtarefaTypes";
import { getToken } from "./localStorageService";

const API_URL = import.meta.env.VITE_API_URL;

export async function buscarSubtarefaPorId(idSubtarefa: number | null): Promise<SubtarefaResponseDTO> {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    if (idSubtarefa == null) throw new Error("Id da subtarefa nulo.");

    const response = await fetch(
        `${API_URL}/task-service/v1/subtarefas/${idSubtarefa}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        let mensagem = "Falha ao buscar subtarefa.";

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

export async function cadastrarSubtarefa(subtarefaDTO: SubtarefaCreateDTO) {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    const response = await fetch(
        `${API_URL}/task-service/v1/subtarefas`, {
        method: "POST",
        headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(subtarefaDTO)
    });

    if (!response.ok) {
        let mensagem = "Falha ao cadastrar subtarefa.";

        try {
            const erro: { message?: string } = await response.json();
            mensagem = erro.message || mensagem;
        } catch {
            // resposta sem corpo JSON: mantém a mensagem padrão
        }

        throw new Error(mensagem);
    }
}

export async function atualizarSubtarefa(idSubtarefa: number | null, subtarefaDTO: SubtarefaUpdateDTO) {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    if (idSubtarefa == null) throw new Error("Id da subtarefa nulo.");

    const response = await fetch(
        `${API_URL}/task-service/v1/subtarefas/${idSubtarefa}`, {
        method: "PUT",
        headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(subtarefaDTO)
    });

    if (!response.ok) {
        let mensagem = "Falha ao atualizar subtarefa.";

        try {
            const erro: { message?: string } = await response.json();
            mensagem = erro.message || mensagem;
        } catch {
            // resposta sem corpo JSON: mantém a mensagem padrão
        }

        throw new Error(mensagem);
    }
}