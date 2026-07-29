import { CalendarCheck2, CalendarClock, ChartNoAxesCombined, Check, ChevronRight, EllipsisVertical, Play, RotateCcw, SquarePen, Trash } from "lucide-react";
import type { Tarefa } from "../../../../types/tarefaTypes";
import { useNavigate } from "react-router-dom";
import { estilosPrioridadeDaTarefa, estilosStatusDaTarefa, formatarDificuldadeDaTarefa, formatarPrioridadeDaTarefa, formatarStatusDaTarefa } from "../../../../utils/formatters";
import { useEffect, useRef, useState } from "react";
import { tags } from "../../../../data/tags";
import CardTagInfo from "../CardTagInfo";

interface CardTarefaProps {
    tarefa: Tarefa;
    onDeletar: (tarefa: Tarefa) => void;
}

const CardTarefa = ({ tarefa, onDeletar }: CardTarefaProps) => {
    const navigate = useNavigate();

    const [menuTarefaAberto, setMenuTarefaAberto] = useState<boolean>(false);
    const menuTarefaRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuTarefaRef.current && !menuTarefaRef.current.contains(event.target as Node)) {
                setMenuTarefaAberto(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return(
        <div className="w-full bg-[#0F0F12] rounded-xl border border-white/8 px-4 py-4 flex flex-col gap-1 hover:border-[#12B5FD]/30 hover:bg-[#13151B] transition-all duration-300">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
                    <p className={`rounded-full px-3 py-0.5 text-[13px] w-fit ${estilosPrioridadeDaTarefa(tarefa.prioridade)}`}>
                        {formatarPrioridadeDaTarefa(tarefa.prioridade)}
                    </p>
                    <h3 className="text-[#E5E1E4] font-bold text-lg">
                        {tarefa.titulo}
                    </h3>
                </div>

                <div ref={menuTarefaRef} className="relative">
                    <button onClick={() => setMenuTarefaAberto((prev) => !prev)} className="shrink-0 self-start cursor-pointer text-[#E5E1E4] rounded-lg p-2 transition-all duration-200 hover:bg-white/5 hover:text-white">
                        <EllipsisVertical size={20} />
                    </button>

                    {menuTarefaAberto && (
                        <div className="absolute right-0 mt-2 w-52 rounded-xl border border-white/10 bg-[#17171C] shadow-xl overflow-hidden z-50">
                            <button onClick={() => navigate(`/editar-tarefa/${tarefa.id}`)} className="w-full flex items-center gap-3 px-4 py-3 text-[#E5E1E4] hover:text-[#12B5FD] hover:bg-[#12B5FD]/10 transition text-[15px] cursor-pointer">
                                <SquarePen size={18} />
                                Editar
                            </button>

                            <div className="h-px bg-white/10" />

                            {tarefa.status === "CONCLUIDA" && (
                                <div>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 text-[#E5E1E4] hover:text-[#12B5FD] hover:bg-[#12B5FD]/10 transition text-[15px] cursor-pointer">
                                        <RotateCcw size={18} />
                                        Reabrir
                                    </button>

                                    <div className="h-px bg-white/10" />
                                </div>
                            )}

                            {tarefa.status === "PENDENTE" && (
                                <div>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 text-[#E5E1E4] hover:text-[#12B5FD] hover:bg-[#12B5FD]/10 transition text-[15px] cursor-pointer">
                                        <Play size={18} />
                                        Iniciar
                                    </button>

                                    <div className="h-px bg-white/10" />
                                </div>
                            )}

                            {tarefa.status === "EM_ANDAMENTO" && (
                                <div>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 text-[#E5E1E4] hover:text-[#12B5FD] hover:bg-[#12B5FD]/10 transition text-[15px] cursor-pointer">
                                        <Check size={18} />
                                        Concluir
                                    </button>

                                    <div className="h-px bg-white/10" />
                                </div>
                            )}

                            <button onClick={() => onDeletar(tarefa)} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition text-[15px] cursor-pointer">
                                <Trash size={18} />
                                Deletar
                            </button>
                        </div>

                        
                    )}
                </div>
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

            <div className="mt-2 flex flex-wrap gap-2 items-center">
                {tags.map((tag) => (
                    <CardTagInfo key={tag.id} tag={tag} />
                ))}
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