import type { Workspace } from "../types/workspaceTypes";

export const workspaces: Workspace[] = [
    {
        id: 1,
        idUsuario: 1,
        nome: "Nexa AI",
        descricao: "Workspace encarregado de guardar as tarefas do Nexa AI",
        criadoEm: "10/10/2026",
        atualizadoEm: "10/10/2026",
        ativo: true,
        qntTarefas: 3,
        iconeWorkspace: "learning",
        cor: "blue"
    },
    {
        id: 2,
        idUsuario: 1,
        nome: "Faculdade",
        descricao: "Workspace encarregado de guardar as tarefas da Faculdade",
        criadoEm: "10/10/2026",
        atualizadoEm: "10/10/2026",
        ativo: true,
        qntTarefas: 10,
        iconeWorkspace: "book",
        cor: "cyan"
    },
    {
        id: 3,
        idUsuario: 1,
        nome: "Projetos",
        descricao: "Workspace encarregado de guardar as tarefas dos Projetos",
        criadoEm: "10/10/2026",
        atualizadoEm: "10/10/2026",
        ativo: true,
        qntTarefas: 7,
        iconeWorkspace: "project",
        cor: "pink"
    },
    {
        id: 4,
        idUsuario: 1,
        nome: "Pessoal",
        descricao: "Workspace encarregado de guardar as tarefas de Pessoal",
        criadoEm: "10/10/2026",
        atualizadoEm: "10/10/2026",
        ativo: true,
        qntTarefas: 19,
        iconeWorkspace: "personal",
        cor: "white"
    },
]