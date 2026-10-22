import type { WorkspaceResponseDTO } from "../types/workspaceTypes";

export const workspaces: WorkspaceResponseDTO[] = [
    {
        id_workspace: 1,
        id_usuario: 1,
        nome: "Nexa AI",
        descricao: "Workspace encarregado de guardar as tarefas do Nexa AI",
        criado_em: "2026-10-10T00:00:00",
        atualizado_em: "2026-10-10T00:00:00",
        ativo: true,
        cor_workspace: { id_cor: 1, cor: "#12B5FD", ativo: true },
        icone_workspace: { id_icone: 1, nome: "learning", caminho: "Brain", ativo: true }
    },
    {
        id_workspace: 2,
        id_usuario: 1,
        nome: "Faculdade",
        descricao: "Workspace encarregado de guardar as tarefas da Faculdade",
        criado_em: "2026-10-10T00:00:00",
        atualizado_em: "2026-10-10T00:00:00",
        ativo: true,
        cor_workspace: { id_cor: 1, cor: "#BEF4FF", ativo: true },
        icone_workspace: { id_icone: 1, nome: "book", caminho: "Book", ativo: true }
    },
    {
        id_workspace: 3,
        id_usuario: 1,
        nome: "Projetos",
        descricao: "Workspace encarregado de guardar as tarefas dos Projetos",
        criado_em: "2026-10-10T00:00:00",
        atualizado_em: "2026-10-10T00:00:00",
        ativo: true,
        cor_workspace: { id_cor: 1, cor: "#EC4899", ativo: true },
        icone_workspace: { id_icone: 1, nome: "project", caminho: "SquareChartGantt", ativo: true }
    },
    {
        id_workspace: 4,
        id_usuario: 1,
        nome: "Pessoal",
        descricao: "Workspace encarregado de guardar as tarefas de Pessoal",
        criado_em: "2026-10-10T00:00:00",
        atualizado_em: "2026-10-10T00:00:00",
        ativo: true,
        cor_workspace: { id_cor: 1, cor: "#D9E2FF", ativo: true },
        icone_workspace: { id_icone: 1, nome: "personal", caminho: "SquareUserRound", ativo: true }
    },
]