import { useDroppable } from "@dnd-kit/core";
import KanbanCard from "./KanbanCard";
import type { TarefaResponseDTO } from "../../../types/tarefaTypes";

interface Props {
    id: string;
    titulo: string;
    tarefas: TarefaResponseDTO[];
    salvando: Set<number>;
}

const KanbanColumn = ({
    id,
    titulo,
    tarefas,
    salvando,
}: Props) => {
    const { setNodeRef, isOver } = useDroppable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            className={`bg-[#111114] border rounded-xl p-4 min-h-[600px] transition ${
                isOver ? "border-[#12B5FD]/50" : "border-white/10"
            }`}
        >
            <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold text-[#E5E1E4]">
                    {titulo}
                </h3>

                <span className="bg-[#232327] text-[#8E909A] text-xs rounded-full px-2 py-1">
                    {tarefas.length}
                </span>
            </div>

            <div className="space-y-3">
                {tarefas.map((tarefa) => (
                    <KanbanCard
                        key={tarefa.id_tarefa}
                        tarefa={tarefa}
                        salvando={salvando.has(tarefa.id_tarefa)}
                    />
                ))}
            </div>
        </div>
    );
};

export default KanbanColumn;
