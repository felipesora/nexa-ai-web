import { Bell, Menu } from "lucide-react";

interface CabecalhoProps {
    titulo: string;
    abrirMenu: () => void;
}

const Cabecalho = ({ titulo, abrirMenu }: CabecalhoProps) => {
    return (
        <header className="bg-[#0D0D0F] flex items-center justify-between px-4 min-[560px]:px-6 py-3.5 border-b border-b-[#44464F]/10">

            <div className="flex items-center gap-3 min-[560px]:gap-4">
                <button
                    onClick={abrirMenu}
                    className="cursor-pointer min-[1024px]:hidden"
                >
                    <Menu size={22} className="text-[#E5E1E4]" />
                </button>

                <h1 className="text-[#E5E1E4] font-semibold text-base min-[560px]:text-lg">
                    {titulo}
                </h1>
            </div>

            <div className="flex items-center gap-2 min-[560px]:gap-3">

                <button className="cursor-pointer">
                    <Bell
                        size={22}
                        className="text-[#E5E1E4] min-[560px]:size-6"
                    />
                </button>

                <div className="hidden min-[560px]:block w-px h-8 bg-white/10" />

                <button className="cursor-pointer flex items-center gap-2">
                    <div className="bg-[#12B5FD] rounded-full px-2.5 py-2 text-white font-semibold text-sm">
                        FS
                    </div>

                    <p className="hidden min-[560px]:block text-[#E5E1E4] text-[15px]">
                        Felipe Sora
                    </p>
                </button>

            </div>

        </header>
    );
};

export default Cabecalho;