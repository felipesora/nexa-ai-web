import { Briefcase, Folder, GraduationCap, Laptop, Dumbbell, Brain, Rocket, type LucideIcon, SquareChartGantt, Book, SquareUserRound, Target } from "lucide-react";

export interface WorkspaceIcon {
    nome: string;
    caminho: string; // nome do ícone no Lucide, igual ao "caminho" salvo no banco
    icon: LucideIcon;
}

export interface WorkspaceColor {
    nome: string;
    cor: string;
}

export const workspaceIcons: WorkspaceIcon[] = [
    { nome: "Padrão", caminho: "Folder", icon: Folder },
    { nome: "Trabalho", caminho: "Briefcase", icon: Briefcase },
    { nome: "Estudos", caminho: "GraduationCap", icon: GraduationCap },
    { nome: "Projetos", caminho: "SquareChartGantt", icon: SquareChartGantt },
    { nome: "Tecnologia", caminho: "Laptop", icon: Laptop },
    { nome: "Aprendizado", caminho: "Brain", icon: Brain },
    { nome: "Leitura", caminho: "Book", icon: Book },
    { nome: "Academia", caminho: "Dumbbell", icon: Dumbbell },
    { nome: "Objetivos", caminho: "Target", icon: Target },
    { nome: "Pessoal", caminho: "SquareUserRound", icon: SquareUserRound },
    { nome: "Startup", caminho: "Rocket", icon: Rocket },
];

export const workspaceColors: WorkspaceColor[] = [
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


// Procura pelo "caminho" do backend (nome do ícone no Lucide)
export function buscarIconeWorkspace(caminho?: string | null): WorkspaceIcon | undefined {
    if (!caminho) return undefined;
    return workspaceIcons.find(i => i.caminho === caminho.trim());
}

// Procura pelo hex salvo no backend; se não estiver na lista, usa o hex mesmo assim
export function buscarCorWorkspace(cor?: string | null): string | undefined {
    if (!cor) return undefined;
    const valor = cor.trim();
    const encontrada = workspaceColors.find(c => c.cor.toLowerCase() === valor.toLowerCase());
    return encontrada?.cor ?? (valor.startsWith("#") ? valor : undefined);
}
