import { Book, Brain, SquareChartGantt, SquareUserRound } from "lucide-react";
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
        iconeWorkspace: Brain,
        cor: "#12B5FD"
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
        iconeWorkspace: Book,
        cor: "#BEF4FF"
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
        iconeWorkspace: SquareChartGantt,
        cor: "#EC4899"
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
        iconeWorkspace: SquareUserRound,
        cor: "#D9E2FF"
    },
]