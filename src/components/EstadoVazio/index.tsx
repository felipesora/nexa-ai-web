import type { LucideIcon } from "lucide-react";

interface EstadoVazioProps {
    icone: LucideIcon;
    titulo: string;
    descricao: string;
}

const EstadoVazio = ({ icone: Icon, titulo, descricao }: EstadoVazioProps) => {
    return (
        <div className="rounded-2xl border border-dashed border-white/10 bg-[#0F0F12] px-6 py-12 md:py-16 flex flex-col items-center text-center">
            <div className="mb-5 rounded-2xl border border-[#12B5FD]/20 bg-[#12B5FD]/10 p-4">
                <Icon size={32} className="text-[#12B5FD]" />
            </div>

            <h3 className="text-lg md:text-xl font-bold text-[#E5E1E4]">
                {titulo}
            </h3>
            <p className="mt-2 max-w-md text-[#8E909A]">
                {descricao}
            </p>
        </div>
    );
};

export default EstadoVazio;
