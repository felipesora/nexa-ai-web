import { Brain, CheckCheck, MessageSquareText, User, Network } from "lucide-react";
import type { DadosEtapaFluxo } from "../types/types";

export const dadosEtapasFluxo: DadosEtapaFluxo[] = [
    {
        icone: User,
        titulo: "Você faz uma solicitação",
        cor: "#B0C6FF"
    },
    {
        icone: MessageSquareText,
        titulo: "IA interpreta",
        cor: "#7DD3FC"
    },
    {
        icone: Brain,
        titulo: "Analisa seu contexto",
        cor: "#C5B1F0"
    },
    {
        icone: Network,
        titulo: "Organiza suas tarefas",
        cor: "#FBBF24"
    },
    {
        icone: CheckCheck,
        titulo: "Rotina organizada",
        cor: "#4ADE80"
    },
]