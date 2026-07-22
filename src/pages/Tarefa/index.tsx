import { useNavigate, useParams } from "react-router-dom";
import { tarefas } from "../../data/tarefas";
import MainLayout from "../../layouts/MainLayout";
import { ArrowLeft, Calendar, CalendarCheck2, CalendarClock, CalendarSync, ChartNoAxesCombined, EllipsisVertical, Plus } from "lucide-react";
import { estilosPrioridadeDaTarefa, estilosStatusDaTarefa, formatarDificuldadeDaTarefa, formatarPrioridadeDaTarefa, formatarStatusDaTarefa } from "../../utils/formatters";
import { subtarefas } from "../../data/subtarefas";
import CardSubtarefa from "./components/CardSubtarefa";

const Tarefa = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const tarefa = tarefas.find(w => w.id === Number(id)) ?? null;
    
    if (!tarefa) {
        return (
            <MainLayout titulo="Workspace">
                Tarefa não encontrada.
            </MainLayout>
        );
    }

    const subtarefasDaTarefa = subtarefas.filter(s => s.idTarefa === tarefa.id);

    const totalSubtarefas = subtarefasDaTarefa.length;

    const subtarefasConcluidas = subtarefasDaTarefa.filter(s => s.concluida).length;

    const progresso = totalSubtarefas === 0 ? 0 : (subtarefasConcluidas / totalSubtarefas) * 100;


    return(
        <MainLayout titulo={`Tarefa: ${tarefa?.titulo}`}>
            <div className="mb-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-[#8E909A] hover:text-[#E5E1E4] transition-colors cursor-pointer group">
                    <ArrowLeft
                        size={18}
                        className="transition-transform group-hover:-translate-x-1"
                    />
                    <span className="text-sm font-medium">
                        Voltar
                    </span>
                </button>
            </div>

            <div className="w-full bg-[#0F0F12] rounded-xl border border-white/8 px-4 py-6">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
                            <p className={`rounded-full px-3 py-0.5 text-[13px] w-fit ${estilosPrioridadeDaTarefa(tarefa.prioridade)}`}>
                                {formatarPrioridadeDaTarefa(tarefa.prioridade)}
                            </p>
                            <h3 className="text-[#E5E1E4] font-bold text-lg">
                                {tarefa.titulo}
                            </h3>
                        </div>
                        <button className="shrink-0 self-start cursor-pointer text-[#E5E1E4] rounded-lg p-2 transition-all duration-200 hover:bg-white/5 hover:text-white">
                            <EllipsisVertical size={20} />
                        </button>
                    </div>

                    <p className="text-[#C5C6D0] text-sm">
                        {tarefa.descricao}
                    </p>

                    <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-[#C5C6D0]">
                                Progresso
                            </span>

                            <span className="text-sm font-medium text-[#E5E1E4]">
                                {subtarefasConcluidas}/{totalSubtarefas}
                            </span>
                        </div>

                        <div className="w-full h-2 bg-[#23252B] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#12B5FD] rounded-full transition-all duration-500"
                                style={{ width: `${progresso}%` }}
                            />
                        </div>
                    </div>

                    <div className="my-6 h-px bg-white/8" />

                    <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-4">
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

                    <div className="my-6 h-px bg-white/8" />

                    <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-4">
                        <p className="flex items-center gap-1 text-[#C5C6D0]/60 text-[14px]">
                            <Calendar size={17} />
                            Criado em: {tarefa.criadoEm}
                        </p>

                        <p className="flex items-center gap-1 text-[#C5C6D0]/60 text-[14px]">
                            <CalendarSync size={17} />
                            Atualizado em: {tarefa.atualizadoEm}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-5 flex flex-col gap-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-[#E5E1E4] font-medium text-lg">
                        Subtarefas <span className="text-[#C5C6D0]/40 text-base">(18)</span>
                    </h3>
                    
                    <button className="w-full sm:w-auto bg-[#12B5FD] hover:bg-[#2BC0FF] transition-colors text-[15px] text-white px-5 py-3 rounded-xl font-medium cursor-pointer flex items-center gap-1 justify-center">
                        <Plus size={22}/>
                        Nova Subtarefa
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    {subtarefas.map((subtarefa) => (
                        <CardSubtarefa
                            key={subtarefa.id}
                            subtarefa={subtarefa}
                        />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}

export default Tarefa;