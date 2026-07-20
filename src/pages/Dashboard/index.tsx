import { CircleAlert, CircleCheck, Clock4 } from "lucide-react";
import CardQuantidadeTarefas from "./components/CardQuantidadeTarefas";
import CardTarefasPrioritarias from "./components/CardTarefasPrioritarias";
import { tarefas } from "../../data/tarefas";
import CardInsightIA from "./components/CardInsightIA";
import MainLayout from "../../layouts/MainLayout";

const Dashboard = () => {

    return(
        <MainLayout titulo="Dashboard">
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
                    className="flex-1 min-w-0"
                />

                <CardInsightIA
                    className="w-full min-[1280px]:w-[360px] min-[1280px]:flex-shrink-0"
                    insight="Você concluiu 80% das tarefas planejadas nesta semana. Recomendo finalizar primeiro as atividades com prazo para hoje e adiar tarefas de baixa prioridade para manter o ritmo de alta performance."
                />
            </div>
        </MainLayout>
    );
}

export default Dashboard;