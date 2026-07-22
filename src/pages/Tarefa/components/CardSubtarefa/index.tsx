import { Calendar, CalendarSync, Check } from "lucide-react";
import type { Subtarefa } from "../../../../types/subtarefaTypes";
import { useState } from "react";

interface CardSubtarefaProps {
    subtarefa: Subtarefa;
}

const CardSubtarefa = ({ subtarefa }: CardSubtarefaProps) => {
    const [checked, setChecked] = useState<boolean>(subtarefa.concluida);

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
            
            <div className="flex flex-col gap-1">
                <h3 className={`text-[#E5E1E4] font-bold text-lg ${checked ? "text-[#8E909A] line-through" : "text-[#E5E1E4]"} `}>
                    {subtarefa.titulo}
                </h3>
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