import type { LucideIcon } from "lucide-react";

interface CardQuantidadeTarefasProps {
    icone: LucideIcon,
    descricao: string,
    quantidade: string,
    cor: string
}

const CardQuantidadeTarefas = ({ icone: Icon , descricao, quantidade, cor }: CardQuantidadeTarefasProps) => {
    return(
        <div className="min-w-[260px] flex-1 bg-[#0F0F12] rounded-xl border border-white/8 px-3 py-4 flex flex-col gap-2">
            <div style={{ backgroundColor: `${cor}1A` }} className="w-fit rounded-xl p-1.5">
                <Icon size={24} style={{ color: cor }} />
            </div>

            <div>
                <p className="text-[#C5C6D0] text-base">
                    {descricao}
                </p>
                <h3 className="text-[#E5E1E4] font-bold text-3xl">
                    {quantidade}
                </h3>
            </div>
        </div>
    );
}

export default CardQuantidadeTarefas;