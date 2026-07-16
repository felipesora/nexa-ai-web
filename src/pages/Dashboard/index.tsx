import { CircleAlert, CircleCheck, Clock4 } from "lucide-react";
import BarraLateralCheia from "../../components/BarraLateral";
import Cabecalho from "../../components/Cabecalho";
import CardQuantidadeTarefas from "./components/CardQuantidadeTarefas";
import { useState } from "react";
import CardTarefasPrioritarias from "./components/CardTarefasPrioritarias";
import { tarefas } from "../../data/tarefas";

const Dashboard = () => {
    const [menuAberto, setMenuAberto] = useState<boolean>(false);

    return(
        <main className="flex h-screen">
            <BarraLateralCheia aberto={menuAberto} fechar={() => setMenuAberto(false)}/>

            <div className="flex flex-col flex-1">
                <Cabecalho titulo="Dashboard" abrirMenu={() => setMenuAberto(true)} />

                <section className="h-full p-6 bg-[#0A0A0C]">
                    <div className="flex flex-wrap gap-6">
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

                    <div className="mt-5">
                        <CardTarefasPrioritarias tarefas={tarefas} />
                    </div>

                </section>
            </div>
        </main>
    );
}

export default Dashboard;