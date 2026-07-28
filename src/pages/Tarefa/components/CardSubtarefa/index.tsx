import { Calendar, CalendarSync, Check, EllipsisVertical, SquarePen, Trash } from "lucide-react";
import type { Subtarefa } from "../../../../types/subtarefaTypes";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CardSubtarefaProps {
    subtarefa: Subtarefa;
    onDeletar: (subtarefa: Subtarefa) => void;
}

const CardSubtarefa = ({ subtarefa, onDeletar }: CardSubtarefaProps) => {
    const navigate = useNavigate();

    const [checked, setChecked] = useState<boolean>(subtarefa.concluida);

    const [menuSubtarefaAberto, setMenuSubtarefaAberto] = useState<boolean>(false);
    const menuSubtarefaRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuSubtarefaRef.current && !menuSubtarefaRef.current.contains(event.target as Node)) {
                setMenuSubtarefaAberto(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return(
        <div className="w-full bg-[#0F0F12] rounded-xl border border-white/8 px-4 py-4 flex items-center gap-3 hover:border-[#12B5FD]/30 hover:bg-[#13151B] transition-all duration-300">        
            <button
                type="button"
                onClick={() => setChecked(!checked)}
                className={`
                    cursor-pointer w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200
                    ${
                        checked
                            ? "bg-[#12B5FD] border-[#12B5FD]"
                            : "bg-[#16181D] border-[#3A3D46] hover:border-[#12B5FD]/70"
                    }
                `}
            >
                {checked && <Check size={14} strokeWidth={3} className="text-white" />}
            </button>

            <Check className="hidden peer-checked:block w-3.5 h-3.5 text-white" />
            
            <div className="flex-1 flex flex-col gap-1">
                <div className="flex justify-between items-center">
                    <h3 className={`text-[#E5E1E4] font-bold text-lg ${checked ? "text-[#8E909A] line-through" : "text-[#E5E1E4]"} `}>
                        {subtarefa.titulo}
                    </h3>

                    <div ref={menuSubtarefaRef} className="relative">
                        <button onClick={() => setMenuSubtarefaAberto((prev) => !prev)} className="shrink-0 self-start cursor-pointer text-[#E5E1E4] rounded-lg p-2 transition-all duration-200 hover:bg-white/5 hover:text-white">
                            <EllipsisVertical size={20} />
                        </button>

                        {menuSubtarefaAberto && (
                            <div className="absolute right-0 mt-2 w-52 rounded-xl border border-white/10 bg-[#17171C] shadow-xl overflow-hidden z-50">
                                <button onClick={() => navigate(`/editar-subtarefa/${subtarefa.id}`)} className="w-full flex items-center gap-3 px-4 py-3 text-[#E5E1E4] hover:text-[#12B5FD] hover:bg-[#12B5FD]/10 transition text-[15px] cursor-pointer">
                                    <SquarePen size={18} />
                                    Editar
                                </button>

                                <div className="h-px bg-white/10" />

                                <button onClick={() => onDeletar(subtarefa)} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition text-[15px] cursor-pointer">
                                    <Trash size={18} />
                                    Deletar
                                </button>
                            </div>

                            
                        )}
                    </div>
                </div>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-4">
                    <p className="flex items-center gap-1 text-[#C5C6D0]/60 text-[14px]">
                        <Calendar size={17} />
                        Criado em: {subtarefa.criadoEm}
                    </p>
                    <p className="flex items-center gap-1 text-[#C5C6D0]/60 text-[14px]">
                        <CalendarSync size={17} />
                        Atualizado em: {subtarefa.atualizadoEm}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CardSubtarefa;