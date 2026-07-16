import type { Tarefa } from "../types/tarefaTypes";

export const tarefas: Tarefa[] = [
    {
        id: 1,
        idUsuario: 1,
        titulo: "Finalizar documentação do AI Service",
        descricao: "Finalizar documentação do AI Service",
        prioridade: "ALTA",
        status: "EM_ANDAMENTO",
        dificuldade: "ALTA",
        dataLimite: "10/10/2026",
        dataConclusao: "10/10/2026",
        criadoEm: "10/10/2026",
        atualizadoEm: "10/10/2026",
        ativo: true,
        idWorkspace: 1,
        nomeWorkspace: "Nexa AI"
    },
    {
        id: 2,
        idUsuario: 1,
        titulo: "Review de código: Nexa Auth Service",
        descricao: "Review de código: Nexa Auth Service",
        prioridade: "MEDIA",
        status: "PENDENTE",
        dificuldade: "BAIXA",
        dataLimite: "10/10/2026",
        dataConclusao: "10/10/2026",
        criadoEm: "10/10/2026",
        atualizadoEm: "10/10/2026",
        ativo: true,
        idWorkspace: 1,
        nomeWorkspace: "Nexa AI"
    },
    {
        id: 3,
        idUsuario: 1,
        titulo: "Setup do Pipeline CI/CD",
        descricao: "Setup do Pipeline CI/CD",
        prioridade: "BAIXA",
        status: "EM_ANDAMENTO",
        dificuldade: "MEDIA",
        dataLimite: "10/10/2026",
        dataConclusao: "10/10/2026",
        criadoEm: "10/10/2026",
        atualizadoEm: "10/10/2026",
        ativo: true,
        idWorkspace: 1,
        nomeWorkspace: "Nexa AI"
    },
]