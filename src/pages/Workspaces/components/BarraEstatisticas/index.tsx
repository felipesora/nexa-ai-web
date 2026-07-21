import type { LucideIcon } from "lucide-react";

interface ItemEstatisticaProps {
    icone: LucideIcon;
    titulo: string;
    quantidade: number;
    cor: string;
}

interface BarraEstatisticasProps {
    itens: ItemEstatisticaProps[];
}

const BarraEstatisticas = ({ itens }: BarraEstatisticasProps) => {
    return (
        <div className=" w-full bg-[#0F0F12] border border-white/8 rounded-xl flex flex-col divide-y divide-white/8 sm:flex-row sm:divide-y-0 sm:divide-x">
            {itens.map(({ icone: Icon, titulo, quantidade, cor }) => (
                <div key={titulo}className="flex-1 px-4 py-3 flex items-center gap-4">
                    <div
                        style={{ backgroundColor: `${cor}1A` }}
                        className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0">
                        <Icon size={22} style={{ color: cor }} />
                    </div>

                    <div>
                        <p className="text-[#8E909A] text-sm">
                            {titulo}
                        </p>

                        <h3 className="text-[#E5E1E4] text-2xl font-bold">
                            {quantidade}
                        </h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BarraEstatisticas;