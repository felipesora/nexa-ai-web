import { Briefcase, Folder, GraduationCap, Laptop, Dumbbell, Brain, Rocket, type LucideIcon, SquareChartGantt, Book, SquareUserRound, Target } from "lucide-react";

export interface WorkspaceIcon {
    id: string;
    nome: string;
    icon: LucideIcon;
}

export interface WorkspaceColor {
    id: string;
    nome: string;
    cor: string;
}

export const workspaceIcons: WorkspaceIcon[] = [
    { id: "folder", nome: "Geral", icon: Folder },
    { id: "briefcase", nome: "Trabalho", icon: Briefcase },
    { id: "study", nome: "Estudos", icon: GraduationCap },
    { id: "project", nome: "Projetos", icon: SquareChartGantt },
    { id: "technology", nome: "Tecnologia", icon: Laptop },
    { id: "learning", nome: "Aprendizado", icon: Brain },
    { id: "book", nome: "Leitura", icon: Book },
    { id: "fitness", nome: "Academia", icon: Dumbbell },
    { id: "goals", nome: "Objetivos", icon: Target },
    { id: "personal", nome: "Pessoal", icon: SquareUserRound },
    { id: "rocket", nome: "Startup", icon: Rocket },
];

export const workspaceColors: WorkspaceColor[] = [
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