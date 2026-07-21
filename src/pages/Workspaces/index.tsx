import { Plus } from "lucide-react";
import { workspaces } from "../../data/workspaces";
import MainLayout from "../../layouts/MainLayout";
import CardWorkspace from "./components/CardWorkspace";

const Workspaces = () => {
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

                    <button className="bg-[#12B5FD] hover:bg-[#2BC0FF] transition-colors text-white px-5 py-3 rounded-xl font-medium cursor-pointer flex items-center gap-1 justify-center">
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
                        />
                    ))}
                </div>

            </div>
        </MainLayout>
    );
};

export default Workspaces;