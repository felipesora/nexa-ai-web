import { CalendarDays, ChartNoAxesCombined, ClipboardList, Goal, RefreshCw } from "lucide-react";
import MainLayout from "../../layouts/MainLayout";

const acoesIA = [
    {
        titulo: "Criar tarefa",
        descricao: "Crie uma nova tarefa usando linguagem natural.",
        icone: ClipboardList,
    },
    {
        titulo: "Organizar agenda",
        descricao: "Organize seus compromissos e tarefas de forma inteligente.",
        icone: CalendarDays,
    },
    {
        titulo: "Criar plano",
        descricao: "Transforme um objetivo em várias tarefas.",
        icone: Goal,
    },
    {
        titulo: "Reorganizar prioridades",
        descricao: "Defina as prioridades das suas tarefas de forma inteligente.",
        icone: RefreshCw,
    },
    {
        titulo: "Analisar produtividade",
        descricao: "Analise sua produtividade e encontre oportunidades de melhoria.",
        icone: ChartNoAxesCombined,
    },
];

const CentralIA = () => {
    return(
        <MainLayout titulo="Central IA">
                <div className="flex flex-1 flex-col items-center justify-center">

                    <div className="mb-10 text-center">
                        <h1 className="text-3xl font-semibold text-white">
                            O que você quer fazer hoje?
                        </h1>

                        <p className="mt-3 text-sm text-gray-500">
                            Escolha uma opção e deixe o Nexa IA ajudar você.
                        </p>
                    </div>

                    <div className="grid w-full grid-cols-1 gap-4 px-4 md:grid-cols-2 xl:grid-cols-3 xl:px-8">
                        {acoesIA.map((acao) => {
                            const Icone = acao.icone;

                            return (
                                <button
                                    key={acao.titulo}
                                    className="group cursor-pointer rounded-2xl border border-white/10 bg-[#0F0F12] p-5 text-left transition duration-200 hover:border-cyan-500/30 hover:bg-[#151A23] hover:shadow-lg hover:shadow-cyan-500/5"
                                >
                                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#171B24] text-[#12B5FD] transition group-hover:bg-cyan-500/10">
                                        <Icone size={22} />
                                    </div>

                                    <h2 className="font-semibold text-white">
                                        {acao.titulo}
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                        {acao.descricao}
                                    </p>
                                </button>
                            );
                        })}
                    </div>

                </div>
        </MainLayout>
    );
}

export default CentralIA;