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

export interface UsuarioRequestDTO {
    nome: string;
    email: string;
}

export interface AlterarSenhaRequestDTO {
    senha_atual: string;
    nova_senha: string;
}
