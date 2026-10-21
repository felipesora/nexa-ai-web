export interface LoginRequestDTO {
    email: string,
    senha: string
}

export interface LoginResponseDTO {
    token: string,
    expiresIn: number
}