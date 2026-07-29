import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { Plus } from "lucide-react";
import CardTag from "./components/CardTag";
import { tags } from "../../data/tags";
import type { Tag } from "../../types/tagTypes";
import { useState } from "react";
import Modal from "../../components/Modal";

const Tags = () => {
    const navigate = useNavigate();

    const [tagSelecionada, setTagSelecionada] = useState<Tag | null>(null);

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

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {tags.map((tag) => (
                        <CardTag
                            key={tag.id}
                            tag={tag}
                            onDeletar={setTagSelecionada}
                        />
                    ))}
                </div>
            </div>

            {tagSelecionada && (
                <Modal
                    tipo="DESTRUTIVO"
                    titulo="Excluir tag?"
                    descricao={`A tag "${tagSelecionada.nome}" será removida. As tarefas associadas perderão essa classificação.`}
                    onCancelar={() => setTagSelecionada(null)}
                    onConfirmar={() => {
                        console.log("Excluir", tagSelecionada.id);
                        
                        setTagSelecionada(null);
                    }}
                />
            )}
        </MainLayout>
    );
}

export default Tags;