import type { CardInformativoProps } from "../types/types";
import {
  MessageSquareText,
  Brain,
  CalendarClock,
  Sparkles,
  BellRing,
} from "lucide-react";

export const dadosCardsInformativos: CardInformativoProps[] = [
    {
        icone: Brain,
        titulo: "Organização inteligente",
        descricao: "A IA entende suas prioridades, reorganiza tarefas automaticamente e cria um planejamento que acompanha sua rotina."
    },
    {
        icone: MessageSquareText,
        titulo: "Converse naturalmente",
        descricao: "Fale com a IA como faria com um assistente humano. Adicione tarefas, pergunte sobre prazos e peça ajuda sem precisar navegar por menus."
    },
    {
        icone: CalendarClock,
        titulo: "Planejamento automático",
        descricao: "Compromissos, prazos e tempo disponível são considerados para distribuir suas tarefas ao longo da semana."
    },
    {
        icone: Sparkles,
        titulo: "Sugestões personalizadas",
        descricao: "Receba recomendações baseadas no seu histórico de produtividade, horários de foco e forma de trabalhar."
    },
    {
        icone: BellRing,
        titulo: "Lembretes inteligentes",
        descricao: "Seja avisado no momento certo. O Nexa AI envia lembretes relevantes sem interromper seu fluxo de trabalho."
    },
]