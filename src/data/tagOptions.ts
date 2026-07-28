export interface TagColor {
    id: string;
    nome: string;
    cor: string;
}

export const tagsColors: TagColor[] = [
    { id: "white", nome: "Branco", cor: "#D9E2FF" },
    { id: "pink", nome: "Rosa", cor: "#EC4899" },
    { id: "purple", nome: "Roxo", cor: "#8B5CF6" },
    { id: "blue", nome: "Azul", cor: "#12B5FD" },
    { id: "cyan", nome: "Ciano", cor: "#BEF4FF" },
    { id: "green", nome: "Verde", cor: "#22C55E" },
    { id: "yellow", nome: "Amarelo", cor: "#EAB308" },
    { id: "orange", nome: "Laranja", cor: "#F97316" },
    { id: "red", nome: "Vermelho", cor: "#EF4444" },
];