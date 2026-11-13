import type { AlterarSenhaRequestDTO, UsuarioRequestDTO, UsuarioResponseDTO } from "../types/usuarioTypes";
import { getToken } from "./localStorageService";

const API_URL = import.meta.env.VITE_API_URL;

export const EVENTO_USUARIO_ATUALIZADO = "usuario-atualizado";

export async function buscarUsuarioPorId(idUsuario: number | null): Promise<UsuarioResponseDTO> {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    if (idUsuario == null) throw new Error("Id do usuário nulo.");

    const response = await fetch(
        `${API_URL}/v1/usuarios/${idUsuario}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        let mensagem = "Falha ao buscar usuário.";

        try {
            const erro: { message?: string } = await response.json();
            mensagem = erro.message || mensagem;
        } catch {
            // resposta sem corpo JSON: mantém a mensagem padrão
        }

        throw new Error(mensagem);
    }

    return response.json();
}

async function lancarErro(response: Response, mensagemPadrao: string): Promise<never> {
    let mensagem = mensagemPadrao;

    try {
        const erro: { message?: string } = await response.json();
        mensagem = erro.message || mensagem;
    } catch {
        // resposta sem corpo JSON: mantém a mensagem padrão
    }

    throw new Error(mensagem);
}

export async function atualizarUsuario(idUsuario: number | null, usuarioDTO: UsuarioRequestDTO) {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    if (idUsuario == null) throw new Error("Id do usuário nulo.");

    const response = await fetch(
        `${API_URL}/v1/usuarios/${idUsuario}`, {
        method: "PUT",
        headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(usuarioDTO)
    });

    if (!response.ok) await lancarErro(response, "Falha ao atualizar seus dados.");

    // Avisa o cabeçalho para trocar o nome sem precisar recarregar a página
    window.dispatchEvent(new CustomEvent<string>(EVENTO_USUARIO_ATUALIZADO, { detail: usuarioDTO.nome }));
}

export async function desativarUsuario(idUsuario: number | null) {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    if (idUsuario == null) throw new Error("Id do usuário nulo.");

    const response = await fetch(
        `${API_URL}/v1/usuarios/${idUsuario}`, {
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) await lancarErro(response, "Falha ao excluir a conta.");
}

export async function alterarSenhaUsuario(idUsuario: number | null, alterarSenhaDTO: AlterarSenhaRequestDTO) {
    const token = getToken();
    if (!token) throw new Error("Erro ao obter o token.");

    if (idUsuario == null) throw new Error("Id do usuário nulo.");

    const response = await fetch(
        `${API_URL}/v1/usuarios/${idUsuario}/senha`, {
        method: "PATCH",
        headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(alterarSenhaDTO)
    });

    if (!response.ok) await lancarErro(response, "Falha ao alterar a senha.");
}
