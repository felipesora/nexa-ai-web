import { ChevronRight, EllipsisVertical, type LucideIcon } from "lucide-react";
import type { Workspace } from "../../../../types/tarefaTypes";
import { useNavigate } from "react-router-dom";

interface CardWorkspaceProps {
    icone: LucideIcon;
    workspace: Workspace;
    cor: string
}

const CardWorkspace = ({ icone: Icon , workspace, cor }: CardWorkspaceProps) => {
    const navigate = useNavigate();

    return(
        <div className="w-full bg-[#0F0F12] rounded-xl border border-white/8 px-4 py-4 flex flex-col gap-2 hover:border-[#12B5FD]/30 hover:bg-[#13151B] hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div style={{ backgroundColor: `${cor}1A` }} className="w-fit rounded-xl p-2">
                        <Icon size={24} style={{ color: cor }} />
                    </div>
                    <h3 className="text-[#E5E1E4] font-bold text-lg">
                        {workspace.nome}
                    </h3>
                </div>

                <button className="cursor-pointer text-[#E5E1E4] rounded-lg p-2 transition-all duration-200 hover:bg-white/5 hover:text-white">
                    <EllipsisVertical size={20} />
                </button>
            </div>

            <p className="text-[#8E909A] text-sm line-clamp-2 mt-1">
                {workspace.descricao}
            </p>

            <span className="inline-flex w-fit rounded-full bg-[#12B5FD]/10 text-[#12B5FD] px-3 py-1 text-xs font-medium">
                {workspace.qntTarefas} tarefas
            </span>

            <button onClick={() => navigate(`/workspace/${workspace.id}`)} className="group cursor-pointer bg-[#1C1B1D] text-[#E5E1E4] rounded-xl flex items-center gap-1 font-medium justify-center py-2 text-[14px] mt-5">
                Abrir Workspace
                <ChevronRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
        </div>
    );
}

export default CardWorkspace;