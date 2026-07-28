import { EllipsisVertical, SquarePen, TagIcon, Trash } from "lucide-react";
import { tagsColors } from "../../../../data/tagOptions";
import type { Tag } from "../../../../types/tagTypes";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CardTagProps {
    tag: Tag;
}

const CardTag = ({ tag }: CardTagProps) => {
    const navigate = useNavigate();
    const [menuAberto, setMenuAberto] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const color = tagsColors.find((c) => c.id === tag.cor);
    const tagColor = color?.cor ?? "#12B5FD";

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuAberto(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div style={{ backgroundColor: `${tagColor}1A`, "--tag-color": tagColor,} as React.CSSProperties} className="border border-transparent rounded-2xl p-3 flex items-center justify-between transition-all duration-300 hover:[border-color:var(--tag-color)]">
            <div className="flex items-center gap-2">
                <TagIcon
                    size={20}
                    color={tagColor}
                />
                <h3 className="text-[#E5E1E4] font-semibold text-md truncate max-w-[180px]">
                    {tag.nome}
                </h3>
            </div>

            <div ref={menuRef} className="relative">
                <button onClick={() => setMenuAberto((prev) => !prev)} className="cursor-pointer text-[#E5E1E4] rounded-lg p-2 transition-all duration-200 hover:bg-white/5 hover:text-white">
                    <EllipsisVertical size={18} />
                </button>

                {menuAberto && (
                    <div className="absolute right-0 mt-2 w-52 rounded-xl border border-white/10 bg-[#17171C] shadow-xl overflow-hidden z-50">
                        <button onClick={() => navigate(`/editar-tag/${tag.id}`)} className="w-full flex items-center gap-3 px-4 py-3 text-[#E5E1E4] hover:text-[#12B5FD] hover:bg-[#12B5FD]/10 transition text-[15px] cursor-pointer">
                            <SquarePen size={18} />
                            Editar
                        </button>

                        <div className="h-px bg-white/10" />

                        <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition text-[15px] cursor-pointer">
                            <Trash size={18} />
                            Deletar
                        </button>
                    </div>

                    
                )}
            </div>
        </div>
    );
}

export default CardTag;