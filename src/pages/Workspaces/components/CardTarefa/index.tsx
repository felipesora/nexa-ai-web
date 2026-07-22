import { CalendarCheck2, CalendarClock, ChartNoAxesCombined, ChevronRight } from "lucide-react";
import type { Tarefa } from "../../../../types/tarefaTypes";
import { useNavigate } from "react-router-dom";
import { estilosPrioridadeDaTarefa, estilosStatusDaTarefa, formatarDificuldadeDaTarefa, formatarPrioridadeDaTarefa, formatarStatusDaTarefa } from "../../../../utils/formatters";

interface CardTarefaProps {
    tarefa: Tarefa;
}

const CardTarefa = ({ tarefa }: CardTarefaProps) => {
    const navigate = useNavigate();

    return(
        <div className="w-full bg-[#0F0F12] rounded-xl border border-white/8 px-4 py-4 flex flex-col gap-1 hover:border-[#12B5FD]/30 hover:bg-[#13151B] transition-all duration-300">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
                <p className={`rounded-full px-3 py-0.5 text-[13px] w-fit ${estilosPrioridadeDaTarefa(tarefa.prioridade)}`}>
                    {formatarPrioridadeDaTarefa(tarefa.prioridade)}
                </p>
                <h3 className="text-[#E5E1E4] font-bold text-lg">
                    {tarefa.titulo}
                </h3>
            </div>

            <p className="text-[#C5C6D0]/60 text-sm mt-1">
                {tarefa.descricao}
            </p>

            <div className="mt-2 flex flex-wrap gap-2 items-center">
                {tarefa.qntSubtarefas > 0 && (
                    <span className="inline-flex w-fit rounded-full bg-[#12B5FD]/10 text-[#12B5FD] px-3 py-1 text-xs font-medium">
                        {tarefa.qntSubtarefas}{" "}
                        {tarefa.qntSubtarefas === 1 ? "subtarefa" : "subtarefas"}
                    </span>
                )}
                <p className="flex items-center gap-1 text-[#C5C6D0]/60 text-[14px]">
                    <ChartNoAxesCombined size={17} />
                    Dificuldade: {formatarDificuldadeDaTarefa(tarefa.dificuldade)}
                </p>
                <p className="flex items-center gap-1 text-[#C5C6D0]/60 text-[14px]">
                    <CalendarClock size={17} />
                    Prazo: {tarefa.dataLimite}
                </p>
                {tarefa.status === "CONCLUIDA" && (
                    <p className="flex items-center gap-1 text-[#C5C6D0]/60 text-[14px]">
                        <CalendarCheck2 size={17} />
                        Finalizada em: {tarefa.dataConclusao}
                    </p>
                )}
                <p className={`rounded-sm px-3 py-0.5 text-[13px] w-fit ${estilosStatusDaTarefa(tarefa.status)}`}>
                    {formatarStatusDaTarefa(tarefa.status)}
                </p>
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    onClick={() => navigate(`/tarefa/${tarefa.id}`)}
                    className="group cursor-pointer w-full sm:w-auto justify-center flex items-center gap-0.5 rounded-lg bg-[#1C1B1D] px-4 py-2 text-sm font-medium text-[#E5E1E4] transition-colors hover:bg-[#252428]">
                    Abrir tarefa
                    <ChevronRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                    />
                </button>
            </div>
        </div>
    );
}

export default CardTarefa;