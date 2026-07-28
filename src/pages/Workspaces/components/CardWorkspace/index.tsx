import { ChevronRight, EllipsisVertical, SquarePen, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Workspace } from "../../../../types/workspaceTypes";
import { useEffect, useRef, useState } from "react";
import { workspaceColors, workspaceIcons } from "../../../../data/workspaceOptions";

interface CardWorkspaceProps {
    icone: string;
    workspace: Workspace;
    cor: string
    onDeletar: (workspace: Workspace) => void;
}

const CardWorkspace = ({ icone , workspace, cor, onDeletar }: CardWorkspaceProps) => {
    const navigate = useNavigate();

    const iconSelecionado = workspaceIcons.find(i => i.id === icone);
    const Icon = iconSelecionado?.icon;
    const corSelecionada = workspaceColors.find(c => c.id === cor);

    const [menuAberto, setMenuAberto] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuAberto(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return(
        <div className="w-full bg-[#0F0F12] rounded-xl border border-white/8 px-4 py-4 flex flex-col gap-2 hover:border-[#12B5FD]/30 hover:bg-[#13151B] hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div style={{ backgroundColor: `${corSelecionada?.cor}1A` }} className="w-fit rounded-xl p-2">
                        {Icon && (
                            <Icon size={24} style={{ color: corSelecionada?.cor }} />
                        )}
                    </div>
                    <h3 className="text-[#E5E1E4] font-bold text-lg">
                        {workspace.nome}
                    </h3>
                </div>

                <div ref={menuRef} className="relative">
                    <button onClick={() => setMenuAberto((prev) => !prev)} className="cursor-pointer text-[#E5E1E4] rounded-lg p-2 transition-all duration-200 hover:bg-white/5 hover:text-white">
                        <EllipsisVertical size={20} />
                    </button>

                    {menuAberto && (
                        <div className="absolute right-0 mt-2 w-52 rounded-xl border border-white/10 bg-[#17171C] shadow-xl overflow-hidden z-50">
                            <button onClick={() => navigate(`/editar-workspace/${workspace.id}`)} className="w-full flex items-center gap-3 px-4 py-3 text-[#E5E1E4] hover:text-[#12B5FD] hover:bg-[#12B5FD]/10 transition text-[15px] cursor-pointer">
                                <SquarePen size={18} />
                                Editar
                            </button>

                            <div className="h-px bg-white/10" />

                            <button onClick={() => onDeletar(workspace)} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition text-[15px] cursor-pointer">
                                <Trash size={18} />
                                Deletar
                            </button>
                        </div>

                        
                    )}
                </div>
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