import type { TarefaCreateDTO } from "../types/tarefaTypes";
import { getToken } from "./localStorageService";

const API_URL = import.meta.env.VITE_API_URL;

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