import { useState, type ReactNode } from "react";
import Cabecalho from "../components/Cabecalho";
import BarraLateral from "../components/BarraLateral";

interface MainLayoutProps {
    titulo: string;
    children: ReactNode;
}

const MainLayout = ({ titulo, children }: MainLayoutProps) => {
    const [menuAberto, setMenuAberto] = useState(false);

    return (
        <main className="flex h-screen">
            <BarraLateral
                aberto={menuAberto}
                fechar={() => setMenuAberto(false)}
            />

            <div className="flex flex-col flex-1 min-h-0">
                <Cabecalho
                    titulo={titulo}
                    abrirMenu={() => setMenuAberto(true)}
                />

                <section className="flex-1 overflow-y-auto bg-[#0A0A0C] p-4 min-[640px]:p-5 min-[1024px]:p-6">
                    {children}
                </section>
            </div>
        </main>
    );
};

export default MainLayout;