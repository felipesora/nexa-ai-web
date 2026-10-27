import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { ArrowLeft, Calendar, CalendarSync, ChevronDown, CircleAlert, CircleCheck, Clock4, EllipsisVertical, Plus, Search, SquarePen, Trash } from "lucide-react";
import CardTarefa, { type AcaoStatusTarefa } from "./components/CardTarefa";
import BarraEstatisticas from "./components/BarraEstatisticas";
import { useEffect, useRef, useState } from "react";
import { tags } from "../../data/tags";
import { buscarCorWorkspace, buscarIconeWorkspace } from "../../data/workspaceOptions";
import type { WorkspaceResponseDTO } from "../../types/workspaceTypes";
import Modal from "../../components/Modal";
import type { TarefaResponseDTO } from "../../types/tarefaTypes";
import { buscarWorkspacePorId, deletarWorkspace, listarTarefasPorIdWorkspace } from "../../services/workspaceService";
import { buscarTarefaPorId, concluirTarefa, deletarTarefa, iniciarTarefa, reabrirTarefa } from "../../services/tarefaService";

const WorkspacePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [workspace, setWorkspace] = useState<WorkspaceResponseDTO>();
    const [tarefas, setTarefas] = useState<TarefaResponseDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [erro, setErro] = useState<string>("");
    const [erroExclusao, setErroExclusao] = useState<string>("");
    const [idTarefaAlterando, setIdTarefaAlterando] = useState<number | null>(null);

    useEffect(() => {
        const getWorkspaceComTarefas = async () => {
            try {
                setLoading(true);
                setErro("");
                const responseWorkspace = await buscarWorkspacePorId(Number(id));
                setWorkspace(responseWorkspace);

                const paginaTarefas = await listarTarefasPorIdWorkspace(responseWorkspace.id_workspace, 100);
                setTarefas(paginaTarefas.content);
            } catch (error) {
                console.error(error);
                setErro(error instanceof Error ? error.message : "Erro ao carregar workspace com tarefas.");
            } finally {
                setLoading(false);
            }
        };

        getWorkspaceComTarefas();
    }, [id]);

    const contarStatus = (status: TarefaResponseDTO["status"]) => tarefas.filter(t => t.status === status).length;

    const [workspaceSelecionado, setWorkspaceSelecionado] = useState<WorkspaceResponseDTO | null>(null);
    const [tarefaSelecionada, setTarefaSelecionada] = useState<TarefaResponseDTO | null>(null);

    const [menuWorkspaceAberto, setMenuWorkspaceAberto] = useState<boolean>(false);
    const menuWorkspaceRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuWorkspaceRef.current && !menuWorkspaceRef.current.contains(event.target as Node)) {
                setMenuWorkspaceAberto(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const iconSelecionado = buscarIconeWorkspace(workspace?.icone_workspace?.caminho);
    const Icon = iconSelecionado?.icon;
    const corSelecionada = { cor: buscarCorWorkspace(workspace?.cor_workspace?.cor) };

    const excluirWorkspace = async (workspace: WorkspaceResponseDTO) => {
        setWorkspaceSelecionado(null);
        setErroExclusao("");

        try {
            await deletarWorkspace(workspace.id_workspace);
            navigate("/workspaces")
        } catch (error) {
            console.error(error);
            setErroExclusao(error instanceof Error ? error.message : "Erro ao excluir workspace.");
        }
    };

    const excluirTarefa = async (tarefa: TarefaResponseDTO) => {
        setTarefaSelecionada(null);
        setErroExclusao("");

        try {
            await deletarTarefa(tarefa.id_tarefa);
            setTarefas(prev => prev.filter(t => t.id_tarefa !== tarefa.id_tarefa));
        } catch (error) {
            console.error(error);
            setErroExclusao(error instanceof Error ? error.message : "Erro ao excluir tarefa.");
        }
    };

    const acoesStatus: Record<AcaoStatusTarefa, (idTarefa: number) => Promise<void>> = {
        INICIAR: iniciarTarefa,
        CONCLUIR: concluirTarefa,
        REABRIR: reabrirTarefa,
    };

    const alterarStatusTarefa = async (tarefa: TarefaResponseDTO, acao: AcaoStatusTarefa) => {
        setIdTarefaAlterando(tarefa.id_tarefa);
        setErroExclusao("");

        try {
            await acoesStatus[acao](tarefa.id_tarefa);

            const tarefaAtualizada = await buscarTarefaPorId(tarefa.id_tarefa);
            setTarefas(prev => prev.map(t => t.id_tarefa === tarefa.id_tarefa ? tarefaAtualizada : t));
        } catch (error) {
            console.error(error);
            setErroExclusao(error instanceof Error ? error.message : "Erro ao alterar status da tarefa.");
        } finally {
            setIdTarefaAlterando(null);
        }
    };

    if (loading) {
        return (
            <MainLayout titulo="Workspace">
                <p className="text-[#8E909A] text-sm">Carregando workspace...</p>
            </MainLayout>
        );
    }

    if (erro || !workspace) {
        return (
            <MainLayout titulo="Workspace">
                <p className="text-red-400 text-sm">{erro || "Workspace não encontrado."}</p>
            </MainLayout>
        );
    }

    return(
        <MainLayout titulo={`Workspace: ${workspace?.nome}`}>
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

            <div className="w-full bg-[#0F0F12] rounded-xl border border-white/8 px-4 py-6 flex justify-between gap-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div
                        style={{ backgroundColor: `${corSelecionada?.cor}1A` }}
                        className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                    >
                        {Icon && (
                            <Icon size={32} style={{ color: corSelecionada?.cor }} />
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <h3 className="text-[#E5E1E4] font-bold text-lg sm:text-xl">
                            {workspace.nome}
                        </h3>

                        <p className="text-[#C5C6D0] text-sm">
                            {workspace.descricao}
                        </p>

                        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-4">
                            <p className="flex items-center gap-1 text-[#C5C6D0]/60 text-[14px]">
                                <Calendar size={17} />
                                Criado em: {new Date(workspace.criado_em).toLocaleDateString("pt-BR")}
                            </p>

                            <p className="flex items-center gap-1 text-[#C5C6D0]/60 text-[14px]">
                                <CalendarSync size={17} />
                                Atualizado em: {new Date(workspace.atualizado_em).toLocaleDateString("pt-BR")}
                            </p>
                        </div>
                    </div>
                </div>

                <div ref={menuWorkspaceRef} className="relative">
                    <button onClick={() => setMenuWorkspaceAberto((prev) => !prev)} className="shrink-0 self-start cursor-pointer text-[#E5E1E4] rounded-lg p-2 transition-all duration-200 hover:bg-white/5 hover:text-white">
                        <EllipsisVertical size={20} />
                    </button>

                    {menuWorkspaceAberto && (
                        <div className="absolute right-0 mt-2 w-52 rounded-xl border border-white/10 bg-[#17171C] shadow-xl overflow-hidden z-50">
                            <button onClick={() => navigate(`/editar-workspace/${workspace.id_workspace}`)} className="w-full flex items-center gap-3 px-4 py-3 text-[#E5E1E4] hover:text-[#12B5FD] hover:bg-[#12B5FD]/10 transition text-[15px] cursor-pointer">
                                <SquarePen size={18} />
                                Editar
                            </button>

                            <div className="h-px bg-white/10" />

                            <button onClick={() => setWorkspaceSelecionado(workspace)} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition text-[15px] cursor-pointer">
                                <Trash size={18} />
                                Deletar
                            </button>
                        </div>

                        
                    )}
                </div>
            </div>

            <div className="mt-5">
                <BarraEstatisticas
                    itens={[
                        {
                            icone: CircleCheck,
                            titulo: "Concluídas",
                            quantidade: contarStatus("CONCLUIDA"),
                            cor: "#12B5FD",
                        },
                        {
                            icone: Clock4,
                            titulo: "Em andamento",
                            quantidade: contarStatus("EM_ANDAMENTO"),
                            cor: "#8E909A",
                        },
                        {
                            icone: CircleAlert,
                            titulo: "Pendentes",
                            quantidade: contarStatus("PENDENTE"),
                            cor: "#FFB4AB",
                        },
                        {
                            icone: CircleAlert,
                            titulo: "Atrasadas",
                            quantidade: contarStatus("ATRASADA"),
                            cor: "#EF4444",
                        },
                    ]}
                />
            </div>

            <div className="mt-5 flex flex-col gap-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-[#E5E1E4] font-medium text-lg">
                        Tarefas <span className="text-[#C5C6D0]/40 text-base">({tarefas.length})</span>
                    </h3>
                    
                    <button onClick={() => navigate(`/cadastro-tarefa/${id}`)} className="w-full sm:w-auto bg-[#12B5FD] hover:bg-[#2BC0FF] transition-colors text-[15px] text-white px-5 py-3 rounded-xl font-medium cursor-pointer flex items-center gap-1 justify-center">
                        <Plus size={22}/>
                        Nova Tarefa
                    </button>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <div className="relative w-full sm:max-w-sm">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E909A] pointer-events-none"
                        />
                        <input
                            type="text"
                            placeholder="Pesquisar tarefas..."
                            className="w-full bg-[#0F0F12] border border-white/8 rounded-xl pl-11 pr-4 py-2.5 text-[14px] text-[#E5E1E4] placeholder:text-[#8E909A] outline-none transition-all duration-200 focus:border-[#12B5FD]/60 focus:ring-2 focus:ring-[#12B5FD]/15"
                        />
                    </div>

                    <div className="relative w-full sm:w-44">
                        <select
                            name="tag"
                            id="tag"
                            defaultValue=""
                            className="appearance-none w-full bg-[#0F0F12] border border-white/8 rounded-xl px-4 py-2.5 pr-10 text-[14px] text-[#E5E1E4] outline-none transition-all duration-200 focus:border-[#12B5FD]/60 focus:ring-2 focus:ring-[#12B5FD]/15 cursor-pointer">
                            <option value="">Tag: todas</option>
                            {tags.map((tag) => (
                                <option key={tag.id} value={tag.id}>{tag.nome}</option>
                            ))}
                        </select>

                        <ChevronDown
                            size={18}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8E909A] pointer-events-none"
                        />
                    </div>

                    <div className="relative w-full sm:w-44">
                        <select
                            name="status"
                            id="status"
                            defaultValue=""
                            className="appearance-none w-full bg-[#0F0F12] border border-white/8 rounded-xl px-4 py-2.5 pr-10 text-[14px] text-[#E5E1E4] outline-none transition-all duration-200 focus:border-[#12B5FD]/60 focus:ring-2 focus:ring-[#12B5FD]/15 cursor-pointer">
                            <option value="">Status: todos</option>
                            <option value="PENDENTE">Pendente</option>
                            <option value="EM_ANDAMENTO">Em andamento</option>
                            <option value="CONCLUIDA">Concluída</option>
                            <option value="ATRASADA">Atrasada</option>
                        </select>

                        <ChevronDown
                            size={18}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8E909A] pointer-events-none"
                        />
                    </div>

                    <div className="relative w-full sm:w-36">
                        <select
                            name="prioridade"
                            id="prioridade"
                            defaultValue=""
                            className="appearance-none w-full bg-[#0F0F12] border border-white/8 rounded-xl px-4 py-2.5 pr-10 text-[14px] text-[#E5E1E4] outline-none transition-all duration-200 focus:border-[#12B5FD]/60 focus:ring-2 focus:ring-[#12B5FD]/15 cursor-pointer">
                            <option value="">Prioridade: todas</option>
                            <option value="BAIXA">Baixa</option>
                            <option value="MEDIA">Média</option>
                            <option value="ALTA">Alta</option>
                            <option value="URGENTE">Urgente</option>
                        </select>

                        <ChevronDown
                            size={18}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8E909A] pointer-events-none"
                        />
                    </div>

                    <button
                        type="button"
                        title="Limpar filtros"
                        className="w-full sm:w-auto flex justify-center px-4 py-2.5 rounded-xl border border-white/8 bg-[#0F0F12] text-[#C5C6D0] text-sm hover:border-white/15 hover:text-[#E5E1E4] transition-colors cursor-pointer"
                    >
                        <Trash size={20}/>
                    </button>
                </div>

                {erroExclusao && (
                    <p className="text-red-400 text-sm">{erroExclusao}</p>
                )}

                <div className="flex flex-col gap-4">
                    {tarefas.length === 0 ? (
                        <p className="text-[#8E909A] text-sm">Este workspace ainda não tem tarefas. Crie a primeira!</p>
                    ) : (
                        tarefas.map((tarefa) => (
                            <CardTarefa
                                key={tarefa.id_tarefa}
                                tarefa={tarefa}
                                onDeletar={setTarefaSelecionada}
                                onAlterarStatus={alterarStatusTarefa}
                                alterandoStatus={idTarefaAlterando === tarefa.id_tarefa}
                            />
                        ))
                    )}
                </div>
            </div>

            {workspaceSelecionado && (
                <Modal 
                    tipo="DESTRUTIVO"
                    titulo="Excluir workspace?"
                    descricao={`Você está prestes a excluir o workspace "${workspaceSelecionado.nome}". Todas as tarefas, subtarefas e demais informações vinculadas a ele serão removidas permanentemente.`}
                    onCancelar={() => setWorkspaceSelecionado(null)}
                    onConfirmar={() => excluirWorkspace(workspaceSelecionado)}
                />
            )}

            {tarefaSelecionada && (
                <Modal
                    tipo="DESTRUTIVO"
                    titulo="Excluir tarefa?"
                    descricao={`A tarefa "${tarefaSelecionada.titulo}" será removida permanentemente. Essa ação não poderá ser desfeita.`}
                    onCancelar={() => setTarefaSelecionada(null)}
                    onConfirmar={() => excluirTarefa(tarefaSelecionada)}
                />
            )}
        </MainLayout>
    );
}

export default WorkspacePage;