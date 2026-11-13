export interface SubtarefaResponseDTO {
    id_subtarefa: number,
    id_usuario: number,
    titulo: string,
    concluida: boolean,
    criado_em: string,
    atualizado_em: string,
    ativo: boolean,
    id_tarefa: number
}

export interface SubtarefaCreateDTO {
    titulo: string,
    id_tarefa: number
}

export interface SubtarefaUpdateDTO {
    titulo: string
}