export interface TarefaResponseDTO {
    id_tarefa: number;
    id_usuario: number;
    titulo: string;
    descricao: string;
    prioridade: "BAIXA" | "MEDIA" | "ALTA" | "URGENTE";
    status: "PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDA" | "ATRASADA";
    dificuldade: "BAIXA" | "MEDIA" | "ALTA";
    data_limite: string;
    data_conclusao: string;
    criado_em: string;
    atualizado_em: string;
    ativo: boolean;
    id_workspace: number;
}

export interface TarefaCreateDTO {
    titulo: string;
    descricao?: string;
    prioridade: "BAIXA" | "MEDIA" | "ALTA" | "URGENTE";
    dificuldade?: "BAIXA" | "MEDIA" | "ALTA";
    data_limite?: string;
    id_workspace: number;
}

export interface TarefaUpdateDTO {
    titulo: string;
    descricao?: string;
    prioridade: "BAIXA" | "MEDIA" | "ALTA" | "URGENTE";
    dificuldade?: "BAIXA" | "MEDIA" | "ALTA";
    data_limite?: string;
}