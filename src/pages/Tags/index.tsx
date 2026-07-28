import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { Plus } from "lucide-react";
import CardTag from "./components/CardTag";
import { tags } from "../../data/tags";

const Tags = () => {
    const navigate = useNavigate();

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

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {tags.map((tag) => (
                        <CardTag
                            key={tag.id}
                            tag={tag}
                        />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}

export default Tags;