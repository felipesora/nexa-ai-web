export interface TagColor {
    nome: string;
    cor: string;
}

export const tagsColors: TagColor[] = [
    { nome: "Branco", cor: "#D9E2FF" },
    { nome: "Rosa", cor: "#EC4899" },
    { nome: "Roxo", cor: "#8B5CF6" },
    { nome: "Azul", cor: "#12B5FD" },
    { nome: "Ciano", cor: "#BEF4FF" },
    { nome: "Verde", cor: "#22C55E" },
    { nome: "Amarelo", cor: "#EAB308" },
    { nome: "Laranja", cor: "#F97316" },
    { nome: "Vermelho", cor: "#EF4444" },
];

// Procura pelo hex salvo no backend; se não estiver na lista, usa o hex mesmo assim
export function buscarCorWorkspace(cor?: string | null): string | undefined {
    if (!cor) return undefined;
    const valor = cor.trim();
    const encontrada = tagsColors.find(c => c.cor.toLowerCase() === valor.toLowerCase());
    return encontrada?.cor ?? (valor.startsWith("#") ? valor : undefined);
}