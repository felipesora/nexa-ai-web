export interface LoginRequestDTO {
    email: string,
    senha: string
}

export interface LoginResponseDTO {
    token: string,
    expiresIn: number
}

export interface CadastroRequestDTO {
    nome: string,
    email: string,
    senha: string
}