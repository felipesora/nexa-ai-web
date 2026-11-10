export interface PerfilResponseDTO {
    id_perfil: number;
    nome: string;
}

export interface UsuarioResponseDTO {
    id_usuario: number;
    nome: string;
    email: string;
    criado_em: string;
    ativo: boolean;
    perfil: PerfilResponseDTO | null;
}
