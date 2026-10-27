import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { Plus } from "lucide-react";
import CardTag from "./components/CardTag";
import type { TagResponseDTO } from "../../types/tagTypes";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { getIdUsuario } from "../../services/localStorageService";
import { deletarTag, listarTagsPorUsuario } from "../../services/tagService";

const Tags = () => {
    const navigate = useNavigate();

    const idUsuario = getIdUsuario();
    const [tags, setTags] = useState<TagResponseDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [erro, setErro] = useState<string>("");
    const [erroExclusao, setErroExclusao] = useState<string>("");
    const [tagSelecionada, setTagSelecionada] = useState<TagResponseDTO | null>(null);

    useEffect(() => {
        const getTags = async () => {
            try {
                setLoading(true);
                setErro("");
                const pagina = await listarTagsPorUsuario(idUsuario);
                setTags(pagina.content);
            } catch (error) {
                console.error(error);
                setErro(error instanceof Error ? error.message : "Erro ao carregar tags.");
            } finally {
                setLoading(false);
            }
        };

        getTags();
    }, [idUsuario]);

    const excluirTag = async (tag: TagResponseDTO) => {
        setTagSelecionada(null);
        setErroExclusao("");

        try {
            await deletarTag(tag.id_tag);
            setTags(prev => prev.filter(t => t.id_tag !== tag.id_tag));
        } catch (error) {
            console.error(error);
            setErroExclusao(error instanceof Error ? error.message : "Erro ao excluir tag.");
        }
    };

    return(
        <MainLayout titulo="Tags">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-[#E5E1E4]">
                            Suas Tags
                        </h2>

                        <p className="text-[#8E909A] mt-1 text-justify">
                            Utilize tags para identificar rapidamente tarefas relacionadas a um mesmo tema. Filtre e encontre atividades em segundos.
                        </p>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={() => navigate("/cadastro-tag")}
                        className="w-full md:w-auto bg-[#12B5FD] hover:bg-[#2BC0FF] transition-colors text-white px-5 py-3 rounded-xl font-medium cursor-pointer flex items-center justify-center gap-1"
                    >
                        <Plus size={22} />
                        Nova Tag
                    </button>
                </div>

                {erroExclusao && (
                    <p role="alert" className="rounded-md border border-red-500/30 bg-red-500/10 text-red-400 px-3 py-2 text-sm">
                        {erroExclusao}
                    </p>
                )}

                {loading ? (
                    <p className="text-[#8E909A]">Carregando tags...</p>
                ) : erro ? (
                    <p role="alert" className="rounded-md border border-red-500/30 bg-red-500/10 text-red-400 px-3 py-2 text-sm">
                        {erro}
                    </p>
                ) : tags.length === 0 ? (
                    <p className="text-[#8E909A]">Você ainda não tem tags. Crie a primeira!</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {tags.map((tag) => (
                        <CardTag
                            key={tag.id_tag}
                            tag={tag}
                            onDeletar={setTagSelecionada}
                        />
                    ))}
                </div>
                )}
            </div>

            {tagSelecionada && (
                <Modal
                    tipo="DESTRUTIVO"
                    titulo="Excluir tag?"
                    descricao={`A tag "${tagSelecionada.nome}" será removida. As tarefas associadas perderão essa classificação.`}
                    onCancelar={() => setTagSelecionada(null)}
                    onConfirmar={() => excluirTag(tagSelecionada)}
                />
            )}
        </MainLayout>
    );
}

export default Tags;