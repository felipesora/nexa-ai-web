import { Calendar, Eye, ListChecks, Zap } from "lucide-react";
import type { TarefaPrioritariaDTO } from "../../../../types/tarefaTypes";
import { estilosStatusDaTarefa, formatarPrioridadeDaTarefa, formatarStatusDaTarefa } from "../../../../utils/formatters";
import { useNavigate } from "react-router-dom";
import Carregando from "../../../../components/Carregando";

interface CardTarefasPrioritariasProps {
    tarefas: TarefaPrioritariaDTO[];
    loading?: boolean;
    className?: string;
}

const formatarData = (data: string | null) =>
    data ? new Date(data).toLocaleDateString("pt-BR") : "Sem prazo";

const CardTarefasPrioritarias = ({ tarefas, loading = false, className = "" }: CardTarefasPrioritariasProps) => {
    const navigate = useNavigate();

    return(
        <div className={`bg-[#0F0F12] rounded-xl border border-white/8 ${className}`}>

            <div>
                <div className="flex items-center justify-between border-b border-b-white/8 px-3 py-4">
                    <div className="flex items-center gap-2">
                        <Zap size={24} className="text-[#E5E1E4]"/>
                        <p className="text-[#E5E1E4] font-medium text-[17px]">Tarefas Prioritárias</p>
                    </div>

                    <button onClick={() => navigate("/workspaces")} className="cursor-pointer whitespace-nowrap text-[#12B5FD] text-sm font-medium transition-all duration-200 hover:text-[#5CCEFF] hover:underline underline-offset-4 min-[640px]:text-[15px]">
                        Ver todas
                    </button>
                </div>

                {loading ? (
                    <Carregando texto="Carregando tarefas..." />
                ) : tarefas.length === 0 ? (
                    <div className="px-3 py-10 flex flex-col items-center text-center">
                        <div className="mb-4 rounded-2xl border border-[#12B5FD]/20 bg-[#12B5FD]/10 p-3">
                            <ListChecks size={28} className="text-[#12B5FD]" />
                        </div>
                        <p className="text-[#E5E1E4] font-medium">Nenhuma tarefa em aberto</p>
                        <p className="mt-1 text-sm text-[#8E909A]">Suas tarefas mais importantes aparecerão aqui.</p>
                    </div>
                ) : (
                    tarefas.map((tarefa, index) => (
                        <div key={tarefa.id_tarefa} className={`px-3 py-4 flex flex-col gap-4 min-[768px]:flex-row min-[768px]:items-center min-[768px]:justify-between ${index !== tarefas.length - 1 ? "border-b border-b-white/8" : ""}`}>
                            <div className="flex items-center gap-3 flex-1">

                                {tarefa.status == "EM_ANDAMENTO" ?
                                    <div className="rounded-full bg-[#B0C6FF] w-2.5 h-2.5 shadow-[0_0_10px_#B0C6FF]"/>
                                    :
                                    <div className="rounded-full bg-[#414247] w-2.5 h-2.5"/>
                                }

                                <div className="flex flex-col gap-0.5">
                                    <h2 className="text-[#E5E1E4] font-normal text-[15px]">
                                        {tarefa.titulo}
                                    </h2>
                                    <div className="flex flex-wrap gap-2 items-center mt-1">
                                        <p className="text-[#8E909A] text-[14px]">
                                            {tarefa.nome_workspace}
                                        </p>
                                        <p className="bg-[#D9E2FF]/10 rounded-sm text-[#D9E2FF] font-medium text-[14px] px-3 py-0.5">
                                            {formatarPrioridadeDaTarefa(tarefa.prioridade)}
                                        </p>
                                        <p className="flex items-center gap-1 text-[#9CEFFF] text-[14px]">
                                            <Calendar size={17} />
                                            Prazo: {formatarData(tarefa.data_limite)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center min-[768px]:justify-normal gap-3">
                                <p className={`rounded-sm px-3 py-0.5 text-[14px] ${estilosStatusDaTarefa(tarefa.status)}`}>
                                    {formatarStatusDaTarefa(tarefa.status)}
                                </p>

                                <button onClick={() => navigate(`/tarefa/${tarefa.id_tarefa}`)} className="cursor-pointer text-[#C5C6D0] rounded-sm p-2 hover:bg-[#353437]/50 transition-all duration-150">
                                    <Eye size={20}/>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>


        </div>
    );
}

export default CardTarefasPrioritarias;
