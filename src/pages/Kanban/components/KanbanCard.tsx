import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useNavigate } from "react-router-dom";
import { estilosPrioridadeDaTarefa, formatarDataCurta, formatarPrioridadeDaTarefa } from "../../../utils/formatters";
import type { TarefaResponseDTO } from "../../../types/tarefaTypes";

interface Props {
    tarefa: TarefaResponseDTO;
    salvando: boolean;
}

const KanbanCard = ({
    tarefa,
    salvando,
}: Props) => {
    const navigate = useNavigate();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        isDragging,
    } = useDraggable({
        id: tarefa.id_tarefa,
        // Concluída é a última etapa e, enquanto salva, o card não pode ser movido de novo
        disabled: salvando || tarefa.status === "CONCLUIDA",
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging || salvando ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            onClick={() =>
                navigate(`/tarefa/${tarefa.id_tarefa}`)
            }
            className={`relative z-10 rounded-lg border border-white/10 bg-[#1A1A1F] p-4 hover:border-[#12B5FD]/50 transition ${
                tarefa.status === "CONCLUIDA" ? "cursor-pointer" : "cursor-grab active:cursor-grabbing"
            }`}
        >
            <div className="flex items-start justify-between gap-2">
                <h4 className="text-[#E5E1E4] font-medium">
                    {tarefa.titulo}
                </h4>

                {tarefa.status === "ATRASADA" && (
                    <span className="shrink-0 rounded-full bg-red-500/15 px-2 py-0.5 text-[11px] text-red-400">
                        Atrasada
                    </span>
                )}
            </div>

            {tarefa.descricao && (
                <p className="text-sm text-[#8E909A] mt-2 line-clamp-2">
                    {tarefa.descricao}
                </p>
            )}

            <div className="flex justify-between mt-4 text-xs">
                <span className={`rounded-full px-3 py-0.5 text-[13px] w-fit ${estilosPrioridadeDaTarefa(tarefa.prioridade)}`}>
                    {formatarPrioridadeDaTarefa(tarefa.prioridade)}
                </span>

                <span className="text-[#8E909A]">
                    {formatarDataCurta(tarefa.data_limite)}
                </span>
            </div>
        </div>
    );
};

export default KanbanCard;
