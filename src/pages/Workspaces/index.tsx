import { Briefcase, FolderPlus, GraduationCap, Plus, User } from "lucide-react";
import MainLayout from "../../layouts/MainLayout";
import CardWorkspace from "./components/CardWorkspace";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { WorkspaceResponseDTO } from "../../types/workspaceTypes";
import Modal from "../../components/Modal";
import Paginacao from "../../components/Paginacao";
import { deletarWorkspace, listarWorkspacesPorUsuario } from "../../services/workspaceService";
import { getIdUsuario } from "../../services/localStorageService";
import Carregando from "../../components/Carregando";

const sugestoesWorkspace = [
    { icon: Briefcase, titulo: "Trabalho", descricao: "Projetos, entregas e reuniões da equipe." },
    { icon: GraduationCap, titulo: "Estudos", descricao: "Cursos, leituras e metas de aprendizado." },
    { icon: User, titulo: "Pessoal", descricao: "Rotina, compras e objetivos pessoais." },
];

const Workspaces = () => {
    const navigate = useNavigate();

    const idUsuario = getIdUsuario();
    const [workspaces, setWorkspaces] = useState<WorkspaceResponseDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [erro, setErro] = useState<string>("");
    const [erroExclusao, setErroExclusao] = useState<string>("");
    const [workspaceSelecionado, setWorkspaceSelecionado] = useState<WorkspaceResponseDTO | null>(null);

    const [pagina, setPagina] = useState<number>(0);
    const [tamanho, setTamanho] = useState<number>(10);
    const [totalPaginas, setTotalPaginas] = useState<number>(0);
    const [totalItens, setTotalItens] = useState<number>(0);
    const [recarregar, setRecarregar] = useState<number>(0);

    useEffect(() => {
        const getWorkspaces = async () => {
            try {
                setLoading(true);
                setErro("");
                const resposta = await listarWorkspacesPorUsuario(idUsuario, tamanho, pagina);

                // Se a página ficou vazia (ex.: excluiu o último item dela), volta uma página
                if (resposta.content.length === 0 && pagina > 0) {
                    setPagina(pagina - 1);
                    return;
                }

                setWorkspaces(resposta.content);
                setTotalPaginas(resposta.totalPages);
                setTotalItens(resposta.totalElements);
            } catch (error) {
                console.error(error);
                setErro(error instanceof Error ? error.message : "Erro ao carregar workspaces.");
            } finally {
                setLoading(false);
            }
        };

        getWorkspaces();
    }, [idUsuario, pagina, tamanho, recarregar]);

    const mudarTamanho = (novoTamanho: number) => {
        setTamanho(novoTamanho);
        setPagina(0);
    };

    const excluirWorkspace = async (workspace: WorkspaceResponseDTO) => {
        setWorkspaceSelecionado(null);
        setErroExclusao("");

        try {
            await deletarWorkspace(workspace.id_workspace);
            setRecarregar(prev => prev + 1);
        } catch (error) {
            console.error(error);
            setErroExclusao(error instanceof Error ? error.message : "Erro ao excluir workspace.");
        }
    };

    return(
        <MainLayout titulo="Workspaces">
            <div className="flex flex-col gap-8">

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-[#E5E1E4]">
                            Seus Workspaces
                        </h2>

                        <p className="text-[#8E909A] mt-1 text-justify">
                            Organize seus projetos em espaços separados para manter tudo bem estruturado.
                        </p>
                    </div>

                    <button onClick={() => navigate("/cadastro-workspace")} className="bg-[#12B5FD] hover:bg-[#2BC0FF] transition-colors text-white px-5 py-3 rounded-xl font-medium cursor-pointer flex items-center gap-1 justify-center">
                        <Plus size={22}/>
                        Novo Workspace
                    </button>
                </div>

                {erroExclusao && (
                    <p role="alert" className="rounded-md border border-red-500/30 bg-red-500/10 text-red-400 px-3 py-2 text-sm">
                        {erroExclusao}
                    </p>
                )}

                {loading && workspaces.length === 0 ? (
                    <Carregando texto="Carregando workspaces..." />
                ) : erro ? (
                    <p role="alert" className="rounded-md border border-red-500/30 bg-red-500/10 text-red-400 px-3 py-2 text-sm">
                        {erro}
                    </p>
                ) : workspaces.length === 0 ? (
                    <div className="relative overflow-hidden rounded-2xl border border-dashed border-white/10 bg-[#0F0F12] px-6 py-14 md:py-20 flex flex-col items-center text-center">
                        <div className="relative mb-6 rounded-2xl border border-[#12B5FD]/20 bg-[#12B5FD]/10 p-5">
                            <FolderPlus size={40} className="text-[#12B5FD]" />
                        </div>

                        <h3 className="relative text-xl md:text-2xl font-bold text-[#E5E1E4]">
                            Nenhum workspace por aqui ainda
                        </h3>
                        <p className="relative mt-2 max-w-md text-[#8E909A]">
                            Crie seu primeiro workspace para reunir tarefas, subtarefas e tags de um mesmo projeto em um só lugar.
                        </p>

                        <button onClick={() => navigate("/cadastro-workspace")} className="relative mt-8 bg-[#12B5FD] hover:bg-[#2BC0FF] transition-colors text-white px-6 py-3 rounded-xl font-medium cursor-pointer flex items-center gap-2">
                            <Plus size={20} />
                            Criar primeiro workspace
                        </button>

                        <div className="relative mt-14 w-full max-w-3xl">
                            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-[#8E909A]">
                                Ideias para começar
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {sugestoesWorkspace.map(({ icon: Icon, titulo, descricao }) => (
                                    <button
                                        key={titulo}
                                        onClick={() => navigate("/cadastro-workspace")}
                                        className="group text-left rounded-xl border border-white/8 bg-[#13151B] p-4 flex flex-col gap-3 cursor-pointer hover:border-[#12B5FD]/30 hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <div className="w-fit rounded-lg bg-white/5 p-2 text-[#8E909A] group-hover:bg-[#12B5FD]/10 group-hover:text-[#12B5FD] transition-colors">
                                            <Icon size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-[#E5E1E4]">{titulo}</h4>
                                            <p className="mt-1 text-sm text-[#8E909A]">{descricao}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={`flex flex-col gap-6 transition-opacity ${loading ? "opacity-60" : ""}`}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                            {workspaces.map((workspace) => (
                                <CardWorkspace
                                    key={workspace.id_workspace}
                                    icone={workspace.icone_workspace?.caminho}
                                    workspace={workspace}
                                    cor={workspace.cor_workspace?.cor}
                                    onDeletar={setWorkspaceSelecionado}
                                />
                            ))}
                        </div>

                        <Paginacao
                            pagina={pagina}
                            totalPaginas={totalPaginas}
                            totalItens={totalItens}
                            tamanho={tamanho}
                            onMudarPagina={setPagina}
                            onMudarTamanho={mudarTamanho}
                            desabilitado={loading}
                        />
                    </div>
                )}

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
        </MainLayout>
    );
};

export default Workspaces;