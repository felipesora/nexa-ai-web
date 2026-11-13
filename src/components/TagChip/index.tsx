import { TagIcon, X } from "lucide-react";
import type { TagResponseDTO } from "../../types/tagTypes";

interface TagChipProps {
    tag: TagResponseDTO;
    // Quando informado, mostra o botão de remover a tag
    onRemover?: (tag: TagResponseDTO) => void;
    removendo?: boolean;
}

const COR_PADRAO = "#12B5FD";

const TagChip = ({ tag, onRemover, removendo = false }: TagChipProps) => {
    const cor = tag.cor_tag?.cor ?? COR_PADRAO;

    return (
        <div
            style={{ backgroundColor: `${cor}20` }}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 ${removendo ? "opacity-50" : ""}`}
        >
            <TagIcon size={13} color={cor} />

            <span className="text-xs text-[#E5E1E4]">
                {tag.nome}
            </span>

            {onRemover && (
                <button
                    type="button"
                    disabled={removendo}
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemover(tag);
                    }}
                    aria-label={`Remover tag ${tag.nome}`}
                    className="cursor-pointer rounded-full text-[#8E909A] hover:text-[#E5E1E4] disabled:cursor-not-allowed"
                >
                    <X size={12} />
                </button>
            )}
        </div>
    );
};

export default TagChip;
