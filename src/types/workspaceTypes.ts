export interface CorWorkspace {
    id_cor: number;
    cor: string;
    ativo: boolean;
}

export interface IconeWorkspace {
    id_icone: number;
    nome: string;
    caminho: string;
    ativo: boolean;
}

export interface WorkspaceResponseDTO {
    id_workspace: number;
    id_usuario: number;
    nome: string;
    descricao: string;
    criado_em: string;
    atualizado_em: string;
    ativo: boolean;
    cor_workspace: CorWorkspace | null;
    icone_workspace: IconeWorkspace | null;
}

export interface WorkspaceRequestDTO {
    nome: string;
    descricao?: string; // opcional: o backend recusa string vazia
    id_cor: number;
    id_icone: number;
}
