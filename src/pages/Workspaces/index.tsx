import { Plus } from "lucide-react";
import MainLayout from "../../layouts/MainLayout";
import CardWorkspace from "./components/CardWorkspace";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Workspace } from "../../types/workspaceTypes";
import Modal from "../../components/Modal";
import { listarWorkspacesPorUsuario } from "../../services/workspaceService";
import { getIdUsuario } from "../../services/localStorageService";

const Workspaces = () => {
    const navigate = useNavigate();

    const idUsuario = getIdUsuario();
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [erro, setErro] = useState<string>("");
    const [workspaceSelecionado, setWorkspaceSelecionado] = useState<Workspace | null>(null);

    useEffect(() => {
        const getWorkspaces = async () => {
            try {
                setLoading(true);
                setErro("");
                const pagina = await listarWorkspacesPorUsuario(idUsuario);
                setWorkspaces(pagina.content);
            } catch (error) {
                console.error(error);
                setErro(error instanceof Error ? error.message : "Erro ao carregar workspaces.");
            } finally {
                setLoading(false);
            }
        };

        getWorkspaces();
    }, [idUsuario]);

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

                {loading ? (
                    <p className="text-[#8E909A]">Carregando workspaces...</p>
                ) : erro ? (
                    <p role="alert" className="rounded-md border border-red-500/30 bg-red-500/10 text-red-400 px-3 py-2 text-sm">
                        {erro}
                    </p>
                ) : workspaces.length === 0 ? (
                    <p className="text-[#8E909A]">Você ainda não tem workspaces. Crie o primeiro!</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                        {workspaces.map((workspace) => (
                            <CardWorkspace
                                key={workspace.id_workspace}
                                icone={workspace.icone_workspace?.nome}
                                workspace={workspace}
                                cor={workspace.cor_workspace?.cor}
                                onDeletar={setWorkspaceSelecionado}
                            />
                        ))}
                    </div>
                )}

            </div>

            {workspaceSelecionado && (
                <Modal 
                    tipo="DESTRUTIVO"
                    titulo="Excluir workspace?"
                    descricao={`Você está prestes a excluir o workspace "${workspaceSelecionado.nome}". Todas as tarefas, subtarefas e demais informações vinculadas a ele serão removidas permanentemente.`}
                    onCancelar={() => setWorkspaceSelecionado(null)}
                    onConfirmar={() => {
                        console.log("Excluir", workspaceSelecionado.id_workspace);
                        
                        setWorkspaceSelecionado(null);
                    }}
                />
            )}
        </MainLayout>
    );
};

export default Workspaces;