import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { ArrowLeft, Calendar, CalendarCheck2, CalendarClock, CalendarSync, ChartNoAxesCombined, Check, EllipsisVertical, Play, Plus, RotateCcw, SquarePen, Trash } from "lucide-react";
import { estilosPrioridadeDaTarefa, estilosStatusDaTarefa, formatarDificuldadeDaTarefa, formatarPrioridadeDaTarefa, formatarStatusDaTarefa } from "../../utils/formatters";
import CardSubtarefa from "./components/CardSubtarefa";
import { useEffect, useRef, useState } from "react";
import Modal from "../../components/Modal";
import type { TarefaResponseDTO } from "../../types/tarefaTypes";
import type { SubtarefaResponseDTO } from "../../types/subtarefaTypes";
import { buscarTarefaPorId, concluirTarefa, deletarTarefa, iniciarTarefa, listarSubtarefasPorIdTarefa, reabrirTarefa } from "../../services/tarefaService";
import { buscarSubtarefaPorId, concluirSubtarefa, deletarSubtarefa, desmarcarConclusaoSubtarefa } from "../../services/subtarefaService";

type AcaoStatusTarefa = "INICIAR" | "CONCLUIR" | "REABRIR";

const acoesStatus: Record<AcaoStatusTarefa, (idTarefa: number) => Promise<void>> = {
    INICIAR: iniciarTarefa,
    CONCLUIR: concluirTarefa,
    REABRIR: reabrirTarefa,
};

function formatarData(data?: string | null) {
    if (!data) return "—";
    const valor = data.length === 10 ? `${data}T00:00:00` : data;
    const date = new Date(valor);
    return Number.isNaN(date.getTime()) ? data : date.toLocaleDateString("pt-BR");
}

const TarefaPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [tarefa, setTarefa] = useState<TarefaResponseDTO>();
    const [subtarefas, setSubtarefas] = useState<SubtarefaResponseDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [erro, setErro] = useState<string>("");
    const [erroAcao, setErroAcao] = useState<string>("");
    const [alterandoStatus, setAlterandoStatus] = useState<boolean>(false);
    const [idSubtarefaAlterando, setIdSubtarefaAlterando] = useState<number | null>(null);

    useEffect(() => {
        const getTarefaComSubtarefas = async () => {
            try {
                setLoading(true);
                setErro("");
                const responseTarefa = await buscarTarefaPorId(Number(id));
                setTarefa(responseTarefa);

                const paginaSubtarefas = await listarSubtarefasPorIdTarefa(responseTarefa.id_tarefa, 100);
                setSubtarefas(paginaSubtarefas.content);
            } catch (error) {
                console.error(error);
                setErro(error instanceof Error ? error.message : "Erro ao carregar tarefa com subtarefas.");
            } finally {
                setLoading(false);
            }
        };

        getTarefaComSubtarefas();
    }, [id]);

    const [tarefaSelecionada, setTarefaSelecionada] = useState<TarefaResponseDTO | null>(null);
    const [subtarefaSelecionada, setSubtarefaSelecionada] = useState<SubtarefaResponseDTO | null>(null);

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

    const alterarStatusTarefa = async (acao: AcaoStatusTarefa) => {
        if (!tarefa) return;

        setMenuTarefaAberto(false);
        setAlterandoStatus(true);
        setErroAcao("");

        try {
            await acoesStatus[acao](tarefa.id_tarefa);

            // Os métodos não retornam a tarefa, então busca de novo para pegar status e datas atualizados
            const tarefaAtualizada = await buscarTarefaPorId(tarefa.id_tarefa);
            setTarefa(tarefaAtualizada);
        } catch (error) {
            console.error(error);
            setErroAcao(error instanceof Error ? error.message : "Erro ao alterar status da tarefa.");
        } finally {
            setAlterandoStatus(false);
        }
    };

    const excluirTarefa = async (tarefaExcluir: TarefaResponseDTO) => {
        setTarefaSelecionada(null);
        setErroAcao("");

        try {
            await deletarTarefa(tarefaExcluir.id_tarefa);
            navigate(`/workspace/${tarefaExcluir.id_workspace}`);
        } catch (error) {
            console.error(error);
            setErroAcao(error instanceof Error ? error.message : "Erro ao excluir tarefa.");
        }
    };

    const alternarConclusaoSubtarefa = async (subtarefa: SubtarefaResponseDTO) => {
        setIdSubtarefaAlterando(subtarefa.id_subtarefa);
        setErroAcao("");

        try {
            if (subtarefa.concluida) {
                await desmarcarConclusaoSubtarefa(subtarefa.id_subtarefa);
            } else {
                await concluirSubtarefa(subtarefa.id_subtarefa);
            }

            // Os métodos não retornam a subtarefa, então busca de novo para pegar o estado salvo
            const subtarefaAtualizada = await buscarSubtarefaPorId(subtarefa.id_subtarefa);
            setSubtarefas(prev => prev.map(s => s.id_subtarefa === subtarefa.id_subtarefa ? subtarefaAtualizada : s));
        } catch (error) {
            console.error(error);
            setErroAcao(error instanceof Error ? error.message : "Erro ao alterar conclusão da subtarefa.");
        } finally {
            setIdSubtarefaAlterando(null);
        }
    };

    const excluirSubtarefa = async (subtarefa: SubtarefaResponseDTO) => {
        setSubtarefaSelecionada(null);
        setErroAcao("");

        try {
            await deletarSubtarefa(subtarefa.id_subtarefa);
            setSubtarefas(prev => prev.filter(s => s.id_subtarefa !== subtarefa.id_subtarefa));
        } catch (error) {
            console.error(error);
            setErroAcao(error instanceof Error ? error.message : "Erro ao excluir subtarefa.");
        }
    };

    if (loading) {
        return (
            <MainLayout titulo="Tarefa">
                <p className="text-[#8E909A] text-sm">Carregando tarefa...</p>
            </MainLayout>
        );
    }

    if (erro || !tarefa) {
        return (
            <MainLayout titulo="Tarefa">
                <p className="text-red-400 text-sm">{erro || "Tarefa não encontrada."}</p>
            </MainLayout>
        );
    }

    const totalSubtarefas = subtarefas.length;
    const subtarefasConcluidas = subtarefas.filter(s => s.concluida).length;
    const progresso = totalSubtarefas === 0 ? 0 : (subtarefasConcluidas / totalSubtarefas) * 100;

    const classeBotaoMenu = "disabled:opacity-60 disabled:cursor-not-allowed w-full flex items-center gap-3 px-4 py-3 text-[#E5E1E4] hover:text-[#12B5FD] hover:bg-[#12B5FD]/10 transition text-[15px] cursor-pointer";

    return(
        <MainLayout titulo={`Tarefa: ${tarefa.titulo}`}>
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
                        <div ref={menuTarefaRef} className="relative">
                            <button onClick={() => setMenuTarefaAberto((prev) => !prev)} className="shrink-0 self-start cursor-pointer text-[#E5E1E4] rounded-lg p-2 transition-all duration-200 hover:bg-white/5 hover:text-white">
                                <EllipsisVertical size={20} />
                            </button>

                            {menuTarefaAberto && (
                                <div className="absolute right-0 mt-2 w-52 rounded-xl border border-white/10 bg-[#17171C] shadow-xl overflow-hidden z-50">
                                    <button onClick={() => navigate(`/editar-tarefa/${tarefa.id_tarefa}`)} className={classeBotaoMenu}>
                                        <SquarePen size={18} />
                                        Editar
                                    </button>

                                    <div className="h-px bg-white/10" />

                                    {tarefa.status === "CONCLUIDA" && (
                                        <div>
                                            <button onClick={() => alterarStatusTarefa("REABRIR")} disabled={alterandoStatus} className={classeBotaoMenu}>
                                                <RotateCcw size={18} />
                                                Reabrir
                                            </button>

                                            <div className="h-px bg-white/10" />
                                        </div>
                                    )}

                                    {tarefa.status === "PENDENTE" && (
                                        <div>
                                            <button onClick={() => alterarStatusTarefa("INICIAR")} disabled={alterandoStatus} className={classeBotaoMenu}>
                                                <Play size={18} />
                                                Iniciar
                                            </button>

                                            <div className="h-px bg-white/10" />
                                        </div>
                                    )}

                                    {tarefa.status === "EM_ANDAMENTO" && (
                                        <div>
                                            <button onClick={() => alterarStatusTarefa("CONCLUIR")} disabled={alterandoStatus} className={classeBotaoMenu}>
                                                <Check size={18} />
                                                Concluir
                                            </button>

                                            <div className="h-px bg-white/10" />
                                        </div>
                                    )}

                                    <button onClick={() => setTarefaSelecionada(tarefa)} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition text-[15px] cursor-pointer">
                                        <Trash size={18} />
                                        Deletar
                                    </button>
                                </div>
                            )}
                        </div>
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
                            Prazo: {formatarData(tarefa.data_limite)}
                        </p>
                        {tarefa.status === "CONCLUIDA" && (
                            <p className="flex items-center gap-1 text-[#C5C6D0]/60 text-[14px]">
                                <CalendarCheck2 size={17} />
                                Finalizada em: {formatarData(tarefa.data_conclusao)}
                            </p>
                        )}
                        <p className={`rounded-sm px-3 py-0.5 text-[13px] w-fit ${estilosStatusDaTarefa(tarefa.status)}`}>
                            {alterandoStatus ? "Atualizando..." : formatarStatusDaTarefa(tarefa.status)}
                        </p>
                    </div>

                    <div className="my-6 h-px bg-white/8" />

                    <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-4">
                        <p className="flex items-center gap-1 text-[#C5C6D0]/60 text-[14px]">
                            <Calendar size={17} />
                            Criado em: {formatarData(tarefa.criado_em)}
                        </p>

                        <p className="flex items-center gap-1 text-[#C5C6D0]/60 text-[14px]">
                            <CalendarSync size={17} />
                            Atualizado em: {formatarData(tarefa.atualizado_em)}
                        </p>
                    </div>
                </div>
            </div>

            {erroAcao && (
                <p className="text-red-400 text-sm mt-4">{erroAcao}</p>
            )}

            <div className="mt-5 flex flex-col gap-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-[#E5E1E4] font-medium text-lg">
                        Subtarefas <span className="text-[#C5C6D0]/40 text-base">({totalSubtarefas})</span>
                    </h3>

                    <button onClick={() => navigate(`/cadastro-subtarefa/${tarefa.id_tarefa}`)} className="w-full sm:w-auto bg-[#12B5FD] hover:bg-[#2BC0FF] transition-colors text-[15px] text-white px-5 py-3 rounded-xl font-medium cursor-pointer flex items-center gap-1 justify-center">
                        <Plus size={22}/>
                        Nova Subtarefa
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    {subtarefas.length === 0 ? (
                        <p className="text-[#8E909A] text-sm">Esta tarefa ainda não tem subtarefas. Crie a primeira!</p>
                    ) : (
                        subtarefas.map((subtarefa) => (
                            <CardSubtarefa
                                key={subtarefa.id_subtarefa}
                                subtarefa={subtarefa}
                                onDeletar={setSubtarefaSelecionada}
                                onAlternarConclusao={alternarConclusaoSubtarefa}
                                alterando={idSubtarefaAlterando === subtarefa.id_subtarefa}
                            />
                        ))
                    )}
                </div>
            </div>

            {tarefaSelecionada && (
                <Modal
                    tipo="DESTRUTIVO"
                    titulo="Excluir tarefa?"
                    descricao={`A tarefa "${tarefaSelecionada.titulo}" será removida permanentemente. Essa ação não poderá ser desfeita.`}
                    onCancelar={() => setTarefaSelecionada(null)}
                    onConfirmar={() => excluirTarefa(tarefaSelecionada)}
                />
            )}

            {subtarefaSelecionada && (
                <Modal
                    tipo="DESTRUTIVO"
                    titulo="Excluir subtarefa?"
                    descricao={`Você está prestes a excluir a subtarefa "${subtarefaSelecionada.titulo}". Essa ação não poderá ser desfeita.`}
                    onCancelar={() => setSubtarefaSelecionada(null)}
                    onConfirmar={() => excluirSubtarefa(subtarefaSelecionada)}
                />
            )}
        </MainLayout>
    );
}

export default TarefaPage;
