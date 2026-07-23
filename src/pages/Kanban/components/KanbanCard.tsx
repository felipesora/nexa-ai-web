import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useNavigate } from "react-router-dom";
import { estilosPrioridadeDaTarefa, formatarPrioridadeDaTarefa } from "../../../utils/formatters";
import type { Tarefa } from "../../../types/tarefaTypes";

interface Props {
    tarefa: Tarefa;
}

const KanbanCard = ({
    tarefa,
}: Props) => {
    const navigate = useNavigate();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        isDragging,
    } = useDraggable({
        id: tarefa.id,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            onClick={() =>
                navigate(`/tarefa/${tarefa.id}`)
            }
            className="rounded-lg border border-white/10 bg-[#1A1A1F] p-4 cursor-grab active:cursor-grabbing hover:border-[#12B5FD]/50 transition"
        >
            <h4 className="text-[#E5E1E4] font-medium">
                {tarefa.titulo}
            </h4>

            <p className="text-sm text-[#8E909A] mt-2 line-clamp-2">
                {tarefa.descricao}
            </p>

            <div className="flex justify-between mt-4 text-xs">
                <span className={`rounded-full px-3 py-0.5 text-[13px] w-fit ${estilosPrioridadeDaTarefa(tarefa.prioridade)}`}>
                    {formatarPrioridadeDaTarefa(tarefa.prioridade)}
                </span>

                <span className="text-[#8E909A]">
                    {tarefa.dataLimite}
                </span>
            </div>
        </div>
    );
};

export default KanbanCard;