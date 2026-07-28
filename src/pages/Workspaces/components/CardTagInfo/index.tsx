import { TagIcon } from "lucide-react";
import type { Tag } from "../../../../types/tagTypes";
import { tagsColors } from "../../../../data/tagOptions";

interface CardTagInfoProps {
    tag: Tag;
}

const CardTagInfo = ({ tag }: CardTagInfoProps) => {
    const color = tagsColors.find((c) => c.id === tag.cor)

    return(
        <div
            style={{ backgroundColor: `${color?.cor}20` }}
            className="flex items-center gap-1.5 rounded-full px-3 py-1"
        >
            <TagIcon
                size={13}
                color={color?.cor}
            />

            <span className="text-xs text-[#E5E1E4]">
                {tag.nome}
            </span>
        </div>
    );
}

export default CardTagInfo;