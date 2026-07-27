import { Bell, LogOut, Menu, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CabecalhoProps {
    titulo: string;
    abrirMenu: () => void;
}

const Cabecalho = ({ titulo, abrirMenu }: CabecalhoProps) => {
    const [menuPerfilAberto, setMenuPerfilAberto] = useState<boolean>(false);

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuPerfilAberto(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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

                <div ref={menuRef} className="relative">
                    <button onClick={() => setMenuPerfilAberto((prev) => !prev)} className="cursor-pointer flex items-center gap-2 rounded-lg px-2 py-1 transition-colors hover:bg-white/5">
                        <div className="bg-[#12B5FD] rounded-full px-2.5 py-2 text-white font-semibold text-sm">
                            FS
                        </div>
                        <p className="hidden min-[560px]:block text-[#E5E1E4] text-[15px]">
                            Felipe Sora
                        </p>
                    </button>

                    {menuPerfilAberto && (
                        <div className="absolute right-0 mt-2 w-52 rounded-xl border border-white/10 bg-[#17171C] shadow-xl overflow-hidden z-50">
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-[#E5E1E4] hover:bg-white/5 transition text-[15px] cursor-pointer">
                                <User size={18} />
                                Meus dados
                            </button>

                            <div className="h-px bg-white/10" />

                            <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition text-[15px] cursor-pointer">
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>

            </div>

        </header>
    );
};

export default Cabecalho;