import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { useEffect, useState } from "react";

import KanbanColumn from "./KanbanColumn";
import type { TarefaResponseDTO } from "../../../types/tarefaTypes";
import {
    concluirTarefa,
    iniciarTarefa,
    listarTarefasPorUsuario,
} from "../../../services/tarefaService";
import { getIdUsuario } from "../../../services/localStorageService";

type StatusTarefa = TarefaResponseDTO["status"];
type ColunaId = Exclude<StatusTarefa, "ATRASADA">;

const colunas: { id: ColunaId; titulo: string }[] = [
    { id: "PENDENTE", titulo: "Pendentes" },
    { id: "EM_ANDAMENTO", titulo: "Em andamento" },
    { id: "CONCLUIDA", titulo: "Concluídas" },
];

// Tarefas atrasadas ainda não foram iniciadas, então ficam na coluna de pendentes
const colunaDoStatus = (status: StatusTarefa): ColunaId =>
    status === "ATRASADA" ? "PENDENTE" : status;

// O fluxo só anda para frente: pendente -> em andamento -> concluída
const ordemColuna: Record<ColunaId, number> = {
    PENDENTE: 0,
    EM_ANDAMENTO: 1,
    CONCLUIDA: 2,
};

const TAMANHO_PAGINA = 100;

async function listarTodasTarefas(idUsuario: number | null): Promise<TarefaResponseDTO[]> {
    const tarefas: TarefaResponseDTO[] = [];
    let pagina = 0;

    while (true) {
        const resultado = await listarTarefasPorUsuario(idUsuario, TAMANHO_PAGINA, pagina);
        tarefas.push(...resultado.content);
        if (resultado.last || resultado.empty) return tarefas;
        pagina++;
    }
}

const KanbanBoard = () => {
    const idUsuario = getIdUsuario();
    const [tarefas, setTarefas] = useState<TarefaResponseDTO[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const [salvando, setSalvando] = useState<Set<number>>(new Set());

    // Exige um pequeno movimento antes de iniciar o arraste, para o clique no card continuar abrindo a tarefa
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    useEffect(() => {
        let ativo = true;

        listarTodasTarefas(idUsuario)
            .then((lista) => ativo && setTarefas(lista))
            .catch((e) => ativo && setErro(e instanceof Error ? e.message : "Falha ao carregar as tarefas."))
            .finally(() => ativo && setCarregando(false));

        return () => {
            ativo = false;
        };
    }, [idUsuario]);

    function alterarStatusLocal(id: number, status: StatusTarefa) {
        setTarefas((lista) =>
            lista.map((t) => (t.id_tarefa === id ? { ...t, status } : t))
        );
    }

    function marcarSalvando(id: number, valor: boolean) {
        setSalvando((atual) => {
            const novo = new Set(atual);
            if (valor) novo.add(id);
            else novo.delete(id);
            return novo;
        });
    }

    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over) return;

        const id = Number(active.id);
        const destino = over.id as ColunaId;
        const tarefa = tarefas.find((t) => t.id_tarefa === id);
        if (!tarefa || salvando.has(id)) return;

        const origem = colunaDoStatus(tarefa.status);
        if (origem === destino) return;

        if (ordemColuna[destino] < ordemColuna[origem]) {
            setErro("Não é possível voltar uma tarefa para uma etapa anterior.");
            return;
        }

        const statusAnterior = tarefa.status;
        setErro(null);
        alterarStatusLocal(id, destino); // atualização otimista
        marcarSalvando(id, true);

        try {
            if (destino === "EM_ANDAMENTO") {
                await iniciarTarefa(id);
            } else {
                await concluirTarefa(id);
            }
        } catch (e) {
            alterarStatusLocal(id, statusAnterior); // desfaz se a API recusar
            setErro(e instanceof Error ? e.message : "Falha ao atualizar a tarefa.");
        } finally {
            marcarSalvando(id, false);
        }
    }

    if (carregando) {
        return <p className="text-[#8E909A]">Carregando tarefas...</p>;
    }

    return (
        <>
            {erro && (
                <p className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
                    {erro}
                </p>
            )}

            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {colunas.map((coluna) => (
                        <KanbanColumn
                            key={coluna.id}
                            id={coluna.id}
                            titulo={coluna.titulo}
                            tarefas={tarefas.filter((t) => colunaDoStatus(t.status) === coluna.id)}
                            salvando={salvando}
                        />
                    ))}
                </div>
            </DndContext>
        </>
    );
};

export default KanbanBoard;
