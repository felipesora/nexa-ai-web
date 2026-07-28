import { EllipsisVertical, TagIcon } from "lucide-react";
import { tagsColors } from "../../../../data/tagOptions";
import type { Tag } from "../../../../types/tagTypes";

interface CardTagProps {
    tag: Tag;
}

const CardTag = ({ tag }: CardTagProps) => {

    const color = tagsColors.find((c) => c.id === tag.cor);

    return (
        <div style={{ backgroundColor: `${color?.cor}1A`, borderColor: `${color?.cor}` }} className={`border rounded-2xl p-3 transition-colors flex items-center justify-between`}>
            <div className="flex items-center gap-2">
                <TagIcon
                    size={20}
                    color={tag.cor === "white" ? "#111114" : "#FFFFFF"}
                />
                <h3 className="text-[#E5E1E4] font-semibold text-md truncate max-w-[180px]">
                    {tag.nome}
                </h3>
            </div>

            <button className="cursor-pointer text-[#E5E1E4] rounded-lg p-2 transition-all duration-200 hover:bg-white/5 hover:text-white">
                <EllipsisVertical size={18} />
            </button>
        </div>
    );
}

export default CardTag;