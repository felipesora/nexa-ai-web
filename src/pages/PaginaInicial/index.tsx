import Logo from "../../assets/logos/logo-completa-nexa-ai.png";
import Demonstracao from "../../assets/images/demonstracao-nexa.png";

const PaginaInicial = () => {
    return(
        <div className="bg-[#0A0A0C]">
            <header className="flex items-center justify-between bg-[#121315] border-b border-b-white/10 px-10 py-5">
                <button className="cursor-pointer">
                    <img src={Logo} alt="Logo Nexa AI" className="w-28" />
                </button>

                <div className="flex items-center gap-5">
                    <button className="cursor-pointer text-white font-medium px-3 py-2 rounded-md transition-all duration-300 hover:bg-white/5 hover:shadow-[0_0_12px_rgba(18,181,253,0.15)]">
                        Entrar
                    </button>

                    <button className="rounded-md bg-[#12B5FD] text-white py-2 px-4 cursor-pointer font-medium transition-all duration-300 hover:bg-[#2BC2FF] hover:shadow-[0_0_10px_rgba(18,181,253,0.35)]">
                        Começe de graça
                    </button>
                </div>
            </header>

            <main>
                <section className="bg-gradient-to-b from-[#0E1013] via-[#0E1219] to-[#0E1419]">
                    <div>
                        <aside>
                            INTELIGÊNCIA ARTIFICIAL EM TEMPO REAL
                        </aside>

                        <div>
                            <h1>Pare de organizar suas tarefas.</h1>
                            <h1>Deixe a IA fazer isso por você.</h1>
                        </div>

                        <p>
                            O Nexa AI entende sua rotina, aprende seus hábitos, organiza tarefas automaticamente e ajuda você a produzir mais com menos esforço.
                        </p>

                        <div>
                            <button>
                                Começar gratuitamente
                            </button>

                            <button>
                                Ver  demonstração
                            </button>
                        </div>
                    </div>

                    <div>
                        <img src={Demonstracao} alt="Imagem de demonstração" />
                    </div>
                </section>
            </main>
        </div>
    );
}

export default PaginaInicial;