import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TagChip from "../TagChip";
import type { TagResponseDTO } from "../../types/tagTypes";
import { listarTodasTagsDoUsuario } from "../../services/tagService";
import { getIdUsuario } from "../../services/localStorageService";

interface SeletorTagsProps {
    selecionadas: TagResponseDTO[];
    onAdicionar: (tag: TagResponseDTO) => void;
    onRemover: (tag: TagResponseDTO) => void;
    // Ids das tags com requisição em andamento (ficam desabilitadas)
    alterando?: Set<number>;
}

const SeletorTags = ({ selecionadas, onAdicionar, onRemover, alterando }: SeletorTagsProps) => {
    const idUsuario = getIdUsuario();
    const [tagsDoUsuario, setTagsDoUsuario] = useState<TagResponseDTO[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [aberto, setAberto] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ativo = true;

        listarTodasTagsDoUsuario(idUsuario)
            .then((tags) => ativo && setTagsDoUsuario(tags.filter((t) => t.ativo)))
            .catch((e) => ativo && setErro(e instanceof Error ? e.message : "Erro ao carregar tags."))
            .finally(() => ativo && setCarregando(false));

        return () => {
            ativo = false;
        };
    }, [idUsuario]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setAberto(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const idsSelecionadas = new Set(selecionadas.map((t) => t.id_tag));
    const disponiveis = tagsDoUsuario.filter((t) => !idsSelecionadas.has(t.id_tag));

    return (
        <div className="flex flex-wrap items-center gap-2">
            {selecionadas.map((tag) => (
                <TagChip
                    key={tag.id_tag}
                    tag={tag}
                    onRemover={onRemover}
                    removendo={alterando?.has(tag.id_tag)}
                />
            ))}

            <div ref={ref} className="relative">
                <button
                    type="button"
                    onClick={() => setAberto((prev) => !prev)}
                    className="flex items-center gap-1 rounded-full border border-dashed border-white/20 px-3 py-1 text-xs text-[#8E909A] transition hover:border-[#12B5FD]/60 hover:text-[#E5E1E4] cursor-pointer"
                >
                    <Plus size={13} />
                    Adicionar tag
                </button>

                {aberto && (
                    <div className="absolute left-0 z-50 mt-2 max-h-64 w-56 overflow-y-auto rounded-xl border border-white/10 bg-[#17171C] py-1 shadow-xl">
                        {carregando ? (
                            <p className="px-4 py-3 text-sm text-[#8E909A]">Carregando...</p>
                        ) : erro ? (
                            <p className="px-4 py-3 text-sm text-red-400">{erro}</p>
                        ) : disponiveis.length === 0 ? (
                            <p className="px-4 py-3 text-sm text-[#8E909A]">
                                {tagsDoUsuario.length === 0 ? "Você ainda não tem tags." : "Todas as tags já foram adicionadas."}
                            </p>
                        ) : (
                            disponiveis.map((tag) => (
                                <button
                                    key={tag.id_tag}
                                    type="button"
                                    onClick={() => {
                                        setAberto(false);
                                        onAdicionar(tag);
                                    }}
                                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-[#E5E1E4] transition hover:bg-[#12B5FD]/10 cursor-pointer"
                                >
                                    <span
                                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                                        style={{ backgroundColor: tag.cor_tag?.cor ?? "#12B5FD" }}
                                    />
                                    <span className="truncate">{tag.nome}</span>
                                </button>
                            ))
                        )}

                        <div className="my-1 h-px bg-white/10" />

                        <Link
                            to="/cadastro-tag"
                            className="block px-4 py-2 text-sm text-[#12B5FD] transition hover:bg-[#12B5FD]/10"
                        >
                            Criar nova tag
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SeletorTags;
