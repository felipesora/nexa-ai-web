import { CircleAlert, CircleCheck, Clock4 } from "lucide-react";
import Cabecalho from "../../components/Cabecalho";
import CardQuantidadeTarefas from "./components/CardQuantidadeTarefas";
import { useState } from "react";
import CardTarefasPrioritarias from "./components/CardTarefasPrioritarias";
import { tarefas } from "../../data/tarefas";
import CardInsightIA from "./components/CardInsightIA";
import BarraLateral from "../../components/BarraLateral";

const Dashboard = () => {
    const [menuAberto, setMenuAberto] = useState<boolean>(false);

    return(
        <main className="flex h-screen">
            <BarraLateral aberto={menuAberto} fechar={() => setMenuAberto(false)}/>

            <div className="flex flex-col flex-1 min-h-0">
                <Cabecalho titulo="Dashboard" abrirMenu={() => setMenuAberto(true)} />

                <section className="flex-1 overflow-y-auto bg-[#0A0A0C] p-4 min-[640px]:p-5 min-[1024px]:p-6">
                    <div className="flex flex-col gap-4 min-[640px]:flex-row min-[640px]:flex-wrap min-[640px]:gap-5 min-[1024px]:gap-6">
                        <CardQuantidadeTarefas
                            icone={CircleCheck}
                            descricao="Tarefas concluídas"
                            quantidade="18"
                            cor="#12B5FD"
                        />
                        <CardQuantidadeTarefas
                            icone={Clock4}
                            descricao="Em andamento"
                            quantidade="07"
                            cor="#8E909A"
                        />
                        <CardQuantidadeTarefas
                            icone={CircleAlert}
                            descricao="Pendentes"
                            quantidade="05"
                            cor="#FFB4AB"
                        />
                    </div>

                    <div className="mt-5 flex flex-col gap-5 min-[1280px]:flex-row min-[1280px]:gap-6">
                        <CardTarefasPrioritarias 
                            tarefas={tarefas} 
                            className="flex-1" 
                        />

                        <CardInsightIA
                            className="w-full min-[1540px]:max-w-md"
                            insight="Você concluiu 80% das tarefas planejadas nesta semana. Recomendo finalizar primeiro as atividades com prazo para hoje e adiar tarefas de baixa prioridade para manter o ritmo de alta performance."
                        />
                    </div>

                </section>
            </div>
        </main>
    );
}

export default Dashboard;