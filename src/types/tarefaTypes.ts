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
    quantidade_subtarefas: number;
    quantidade_subtarefas_concluidas: number;
}

export interface FiltroTarefas {
    titulo?: string;
    status?: TarefaResponseDTO["status"] | "";
    prioridade?: TarefaResponseDTO["prioridade"] | "";
    idTag?: number | null;
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

export interface TarefaPrioritariaDTO {
    id_tarefa: number;
    titulo: string;
    prioridade: TarefaResponseDTO["prioridade"];
    status: TarefaResponseDTO["status"];
    data_limite: string | null;
    id_workspace: number;
    nome_workspace: string;
}

export interface ResumoTarefasDTO {
    concluidas: number;
    em_andamento: number;
    pendentes: number;
    atrasadas: number;
    tarefas_prioritarias: TarefaPrioritariaDTO[];
}
