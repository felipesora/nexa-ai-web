import type { LucideIcon } from "lucide-react";

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