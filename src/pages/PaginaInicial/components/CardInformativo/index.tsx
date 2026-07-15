import type { CardInformativoProps } from "../../types/types";

const CardInformativo = ({ icone: Icon, titulo, descricao }: CardInformativoProps) => {
    return(
        <div className="bg-[#101012] rounded-3xl border border-white/10 flex flex-col items-start gap-2 p-8 h-full w-full">
            <div className="rounded-[10px] bg-[#B0C6FF]/10 p-2">
                <Icon size={24} className="text-[#B0C6FF]" />
            </div>

            <h1 className="text-white font-medium">
                {titulo}
            </h1>

            <p className="text-sm text-justify text-[#C2C6D8]">
                {descricao}
            </p>
        </div>
    );
}

export default CardInformativo;