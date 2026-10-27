export interface TagResponseDTO {
    id_tag: number;
    id_usuario: number;
    nome: string;
    cor_tag: string;
    ativo: boolean;
}

export interface TagRequestDTO {
    nome: string;
    id_cor: number;
}

export interface CorTag {
    id_cor: number;
    cor: string;
    ativo: boolean;
}
