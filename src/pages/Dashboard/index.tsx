import { CircleAlert, CircleCheck, Clock4 } from "lucide-react";
import { useEffect, useState } from "react";
import CardQuantidadeTarefas from "./components/CardQuantidadeTarefas";
import CardTarefasPrioritarias from "./components/CardTarefasPrioritarias";
import CardInsightIA from "./components/CardInsightIA";
import MainLayout from "../../layouts/MainLayout";
import type { ResumoTarefasDTO } from "../../types/tarefaTypes";
import { buscarResumoTarefas } from "../../services/tarefaService";
import { getIdUsuario } from "../../services/localStorageService";

const formatarQuantidade = (quantidade: number | undefined) =>
    quantidade == null ? "--" : String(quantidade).padStart(2, "0");

const Dashboard = () => {
    const idUsuario = getIdUsuario();

    const [resumo, setResumo] = useState<ResumoTarefasDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [erro, setErro] = useState<string>("");

    useEffect(() => {
        const getResumo = async () => {
            try {
                setLoading(true);
                setErro("");
                setResumo(await buscarResumoTarefas(idUsuario));
            } catch (error) {
                console.error(error);
                setErro(error instanceof Error ? error.message : "Erro ao carregar dados da dashboard.");
            } finally {
                setLoading(false);
            }
        };

        getResumo();
    }, [idUsuario]);

    const pendentes = resumo ? resumo.pendentes + resumo.atrasadas : undefined;

    return(
        <MainLayout titulo="Dashboard">
            <div className="flex flex-col gap-8">

                <div>
                    <h2 className="text-2xl font-bold text-[#E5E1E4]">
                        Bem-vindo de volta
                    </h2>

                    <p className="text-[#8E909A] mt-1 max-w-full text-justify">
                        Acompanhe o progresso das suas tarefas, visualize suas prioridades
                        e receba insights da IA para manter sua produtividade em alta.
                    </p>
                </div>

                {erro && (
                    <p role="alert" className="rounded-md border border-red-500/30 bg-red-500/10 text-red-400 px-3 py-2 text-sm">
                        {erro}
                    </p>
                )}

                <div>
                    <div className="flex flex-col gap-4 min-[640px]:flex-row min-[640px]:flex-wrap min-[640px]:gap-5 min-[1024px]:gap-6">
                        <CardQuantidadeTarefas
                            icone={CircleCheck}
                            descricao="Tarefas concluídas"
                            quantidade={formatarQuantidade(resumo?.concluidas)}
                            cor="#12B5FD"
                        />
                        <CardQuantidadeTarefas
                            icone={Clock4}
                            descricao="Em andamento"
                            quantidade={formatarQuantidade(resumo?.em_andamento)}
                            cor="#8E909A"
                        />
                        <CardQuantidadeTarefas
                            icone={CircleAlert}
                            descricao="Pendentes"
                            quantidade={formatarQuantidade(pendentes)}
                            cor="#FFB4AB"
                        />
                    </div>

                    <div className="mt-5 flex flex-col gap-5 min-[1280px]:flex-row min-[1280px]:gap-6">
                        <CardTarefasPrioritarias
                            tarefas={resumo?.tarefas_prioritarias ?? []}
                            loading={loading}
                            className="flex-1 min-w-0"
                        />
                        <CardInsightIA
                            className="w-full min-[1280px]:w-[360px] min-[1280px]:flex-shrink-0"
                            insight="Você concluiu 80% das tarefas planejadas nesta semana. Recomendo finalizar primeiro as atividades com prazo para hoje e adiar tarefas de baixa prioridade para manter o ritmo de alta performance."
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default Dashboard;
