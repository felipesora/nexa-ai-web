import { Plus } from "lucide-react";
import { workspaces } from "../../data/workspaces";
import MainLayout from "../../layouts/MainLayout";
import CardWorkspace from "./components/CardWorkspace";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Workspace } from "../../types/workspaceTypes";
import Modal from "../../components/Modal";

const Workspaces = () => {
    const navigate = useNavigate();

    const [workspaceSelecionado, setWorkspaceSelecionado] = useState<Workspace | null>(null);

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

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {workspaces.map((workspace) => (
                        <CardWorkspace
                            key={workspace.id}
                            icone={workspace.iconeWorkspace}
                            workspace={workspace}
                            cor={workspace.cor}
                            onDeletar={setWorkspaceSelecionado}
                        />
                    ))}
                </div>

            </div>

            {workspaceSelecionado && (
                <Modal 
                    tipo="DESTRUTIVO"
                    titulo="Excluir workspace?"
                    descricao={`Você está prestes a excluir o workspace "${workspaceSelecionado.nome}". Todas as tarefas, subtarefas e demais informações vinculadas a ele serão removidas permanentemente.`}
                    onCancelar={() => setWorkspaceSelecionado(null)}
                    onConfirmar={() => {
                        console.log("Excluir", workspaceSelecionado.id);
                        
                        setWorkspaceSelecionado(null);
                    }}
                />
            )}
        </MainLayout>
    );
};

export default Workspaces;