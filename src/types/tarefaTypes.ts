import type { LucideIcon } from "lucide-react";

export interface Tarefa {
    id: number;
    idUsuario: number;
    titulo: string;
    descricao: string;
    prioridade: string;
    status: string;
    dificuldade: string;
    dataLimite: string;
    dataConclusao: string;
    criadoEm: string;
    atualizadoEm: string;
    ativo: boolean;
    idWorkspace: number
    nomeWorkspace?: string
}

export interface Workspace {
    id: number;
    idUsuario: number;
    nome: string;
    descricao: string;
    criadoEm: string;
    atualizadoEm: string;
    ativo: boolean;
    qntTarefas: number;
    iconeWorkspace: LucideIcon;
    cor: string;
}