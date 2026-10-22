import { jwtDecode } from "jwt-decode";
import type { CadastroRequestDTO, LoginRequestDTO, LoginResponseDTO } from "../types/auth";
import { getToken, salvarIdUsuario, salvarToken } from "./localStorageService";

const API_URL = import.meta.env.VITE_API_URL;

interface JwtPayload {
    sub: string;
    idUsuario: number;
    role: "ADMIN" | "USER";
    iat: number;
    exp: number;
}

export async function fazerLogin(loginRequestDTO: LoginRequestDTO) {
    const response = await fetch(
        `${API_URL}/auth-service/v1/auth/login`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginRequestDTO)
        }
    );

    if (!response.ok) {
        let mensagem = "Falha ao realizar login.";

        try {
            const erro: { message?: string; errors?: Record<string, string> } = await response.json();
            const errosCampos = erro.errors ? Object.values(erro.errors) : [];
            mensagem = errosCampos.length > 0 ? errosCampos.join(" ") : erro.message || mensagem;
        } catch {
            // resposta sem corpo JSON: mantém a mensagem padrão
        }

        throw new Error(mensagem);
    }

    const data: LoginResponseDTO = await response.json();
    salvarToken(data.token);

    const decoded = jwtDecode<JwtPayload>(data.token);

    salvarIdUsuario(String(decoded.idUsuario));
}

export async function fazerCadastro(cadastroRequestDTO: CadastroRequestDTO) {
    const response = await fetch(
        `${API_URL}/auth-service/v1/auth/register`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cadastroRequestDTO)
        }
    );

    if (!response.ok) {
        let mensagem = "Falha ao realizar cadastro.";

        try {
            const erro: { message?: string; errors?: Record<string, string> } = await response.json();
            const errosCampos = erro.errors ? Object.values(erro.errors) : [];
            mensagem = errosCampos.length > 0 ? errosCampos.join(" ") : erro.message || mensagem;
        } catch {
            // resposta sem corpo JSON: mantém a mensagem padrão
        }

        throw new Error(mensagem);
    }
}

export function isTokenValid() {
    const token = getToken();
    if (!token) return false;

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        const currentTime = Date.now() / 1000;

        return decoded.exp > currentTime;

    } catch (error) {
        console.error("Erro ao decodificar token: ", error);
        return false;
    }
}