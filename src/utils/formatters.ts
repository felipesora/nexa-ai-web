export const formatarStatusDaTarefa = (status: string) => {
    switch (status) {
        case "EM_ANDAMENTO":
            return "Em andamento";
        case "PENDENTE":
            return "Pendente";
        case "CONCLUIDA":
            return "Concluída";
        default:
            return status;
    }
};

export const estilosStatusDaTarefa = (status: string) => {
    switch (status) {
        case "PENDENTE":
            return "bg-[#353437]/50 border border-white/10 text-[#C5C6D0]";

        case "EM_ANDAMENTO":
            return "bg-blue-500/10 border border-blue-500/30 text-blue-300";

        case "CONCLUIDA":
            return "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300";

        default:
            return "bg-[#353437]/50 border border-white/10 text-[#C5C6D0]";
    }
};

export const formatarPrioridadeDaTarefa = (prioridade: string) => {
    switch (prioridade) {
        case "BAIXA":
            return "Baixa";
        case "MEDIA":
            return "Média";
        case "ALTA":
            return "Alta";
        case "URGENTE":
            return "Urgente";
        default:
            return prioridade;
    }
};

export const formatarDificuldadeDaTarefa = (dificuldade: string) => {
    switch (dificuldade) {
        case "BAIXA":
            return "Baixa";
        case "MEDIA":
            return "Média";
        case "ALTA":
            return "Alta";
        default:
            return dificuldade;
    }
};

export const estilosPrioridadeDaTarefa = (prioridade: string) => {
    switch (prioridade) {
        case "BAIXA":
            return "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300";

        case "MEDIA":
            return "bg-yellow-500/10 border border-yellow-500/30 text-yellow-300";

        case "ALTA":
            return "bg-red-500/10 border border-red-500/30 text-red-300";

        case "URGENTE":
            return "bg-rose-900/20 border border-rose-900/60 text-rose-300";

        default:
            return "bg-[#353437]/50 border border-white/10 text-[#C5C6D0]";
    }
};