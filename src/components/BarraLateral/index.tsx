import { LayoutDashboard, ListChecks, MessagesSquare } from "lucide-react";
import LogoCompleta from "../../assets/logos/logo-completa-nexa-ai.png";

interface BarraLateralProps{
    aberto:boolean;
    fechar:()=>void;
}

const BarraLateral = ({ aberto, fechar }:BarraLateralProps) => {
    return (
        <>
            {aberto && (
                <div
                    onClick={fechar}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                />
            )}

            <aside className={`fixed top-0 left-0 z-50 h-screen bg-[#0E0E10] transition-transform duration-300 ${aberto ? "translate-x-0" : "-translate-x-full"} w-[250px] lg:static lg:translate-x-0 border-r border-r-[#44464F]/10 flex flex-col py-6 px-4 gap-7`}>
                <div className="flex justify-center">
                    <img
                        src={LogoCompleta}
                        alt="Logo Nexa AI"
                        className="w-36"
                    />
                </div>

                <nav>
                    <ul className="space-y-2">
                        <li>
                            <button className="cursor-pointer w-full rounded-[10px] flex items-center gap-3 px-4 py-3.5 text-[#E5E1E4] hover:text-[#12B5FD] hover:bg-[#12B5FD]/10 transition-all duration-200">
                                <LayoutDashboard size={22} />
                                Dashboard
                            </button>
                        </li>

                        <li>
                            <button className="cursor-pointer w-full rounded-[10px] flex items-center gap-3 px-4 py-3.5 text-[#E5E1E4] hover:text-[#12B5FD] hover:bg-[#12B5FD]/10 transition-all duration-200">
                                <MessagesSquare size={22} />
                                Chat IA
                            </button>
                        </li>

                        <li>
                            <button className="cursor-pointer w-full rounded-[10px] flex items-center gap-3 px-4 py-3.5 text-[#E5E1E4] hover:text-[#12B5FD] hover:bg-[#12B5FD]/10 transition-all duration-200">
                                <ListChecks size={22} />
                                Tarefas
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default BarraLateral;