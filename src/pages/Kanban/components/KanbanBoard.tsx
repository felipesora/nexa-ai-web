import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";

import { tarefas as tarefasMock } from "../../../data/tarefas";
import KanbanColumn from "./KanbanColumn";
import type { Tarefa } from "../../../types/tarefaTypes";

type StatusTarefa = Tarefa["status"];

const colunas: {
    id: StatusTarefa;
    titulo: string;
}[] = [
    {
        id: "PENDENTE",
        titulo: "Pendentes",
    },
    {
        id: "EM_ANDAMENTO",
        titulo: "Em andamento",
    },
    {
        id: "CONCLUIDA",
        titulo: "Concluídas",
    },
];

const KanbanBoard = () => {
    const [tarefas, setTarefas] = useState(tarefasMock);

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (!over) return;

        const id = Number(active.id);
        const novoStatus = over.id as StatusTarefa;

        setTarefas((tarefas) =>
            tarefas.map((tarefa) =>
                tarefa.id === id
                    ? {
                        ...tarefa,
                        status: novoStatus,
                    }
                    : tarefa
            )
        );
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {colunas.map((coluna) => (
                    <KanbanColumn
                        key={coluna.id}
                        id={coluna.id}
                        titulo={coluna.titulo}
                        tarefas={tarefas.filter(
                            (t) => t.status === coluna.id
                        )}
                    />
                ))}
            </div>
        </DndContext>
    );
};

export default KanbanBoard;